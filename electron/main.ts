import { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, screen } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import si from 'systeminformation'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null = null
let widgetWin: BrowserWindow | null = null
let tray: Tray | null = null
let prevRx = 0
let prevTx = 0
const downQueue = [0, 0]
const upQueue = [0, 0]

function format(bytes: number) {
  const kb = bytes / 1024
  const mb = kb / 1024
  if (mb >= 10) return `${mb.toFixed(0)}M`
  if (mb >= 1) return `${mb.toFixed(1)}M`
  if (kb >= 100) return `${kb.toFixed(0)}K`
  return `${kb.toFixed(0)}K`
}

async function updateStats() {
  try {
    const stats = await si.networkStats()
    if (!stats || stats.length === 0) return

    let currentRx = 0
    let currentTx = 0
    
    // Sum across all valid active interfaces, bypassing loopback if possible
    for (const stat of stats) {
       if (stat.iface !== 'lo' && !stat.iface.includes('Loopback')) {
           currentRx += stat.rx_bytes
           currentTx += stat.tx_bytes
       }
    }

    // Wait for the first tick to initialize prev before pumping huge numbers
    if (prevRx === 0 && prevTx === 0) {
        prevRx = currentRx
        prevTx = currentTx
        return
    }

    const rawDown = Math.max(0, currentRx - prevRx)
    const rawUp = Math.max(0, currentTx - prevTx)

    prevRx = currentRx
    prevTx = currentTx

    // 2-second moving window perfectly masks Windows performance counter 2s ticks
    downQueue.shift()
    downQueue.push(rawDown)
    upQueue.shift()
    upQueue.push(rawUp)

    const down = (downQueue[0] + downQueue[1]) / 2
    const up = (upQueue[0] + upQueue[1]) / 2

    if (tray) {
      tray.setToolTip(`NSX Monitor\nDown: ${format(down)}/s\nUp: ${format(up)}/s`)
    }

    const payload = {
      down,
      up,
      totalDown: currentRx,
      totalUp: currentTx,
      iface: stats[0].iface,
      operstate: stats[0].operstate
    }

    if (win && !win.isDestroyed()) {
      win.webContents.send('network-stats', payload)
    }

    if (widgetWin && !widgetWin.isDestroyed()) {
      widgetWin.webContents.send('network-stats', payload)
    }
  } catch (error) {
    console.error('Failed to update stats:', error)
  }
}

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
    show: false, // Don't show immediately
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  win.on('close', (event) => {
    if ((app as any).isQuitting) {
      win = null
    } else {
      event.preventDefault()
      win?.hide()
    }
  })
}

function createWidget() {
  const display = screen.getPrimaryDisplay()
  const width = 160
  const height = 60

  widgetWin = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width,
    height,
    x: display.workArea.width - width - 20,
    y: display.workArea.height - height - 20,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  if (VITE_DEV_SERVER_URL) {
    widgetWin.loadURL(`${VITE_DEV_SERVER_URL}?type=widget`)
  } else {
    widgetWin.loadFile(path.join(RENDERER_DIST, 'index.html'), { query: { type: 'widget' } })
  }

  widgetWin.on('close', (event) => {
    if ((app as any).isQuitting) {
      widgetWin = null
    } else {
      event.preventDefault()
      widgetWin?.hide()
    }
  })
}

function initTray() {
  const iconPath = path.join(process.env.VITE_PUBLIC, 'electron-vite.svg')
  tray = new Tray(nativeImage.createFromPath(iconPath))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'NSX Monitor', enabled: false },
    { type: 'separator' },
    { label: 'Show Dashboard', click: () => {
      if (win) {
        win.show()
        win.focus()
      }
    }},
    { label: 'Show/Hide Widget', click: () => {
      if (widgetWin) {
        widgetWin.isVisible() ? widgetWin.hide() : widgetWin.show()
      }
    }},
    { type: 'separator' },
    { label: 'Quit', click: () => {
      (app as any).isQuitting = true
      app.quit()
    }}
  ])
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    if (win) {
      win.isVisible() ? win.hide() : win.show()
    }
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
    createWidget()
  }
})

app.whenReady().then(() => {
  createWindow()
  createWidget()
  initTray()
  
  // Initial stats to avoid first jump
  si.networkStats().then(stats => {
    if (stats && stats.length > 0) {
      prevRx = stats[0].rx_bytes
      prevTx = stats[0].tx_bytes
    }
  })

  setInterval(updateStats, 1000)
})
