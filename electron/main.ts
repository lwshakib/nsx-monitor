import { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, screen, shell } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import si from 'systeminformation'
import { saveNetworkData, getNetworkData, clearDB, getDbPath } from './database'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

// Platform-specific icon paths
/**
 * Utility function to get the correct icon path based on the current operating system.
 */
const getIconPath = (): string => {
  const platform = process.platform;
  const basePath = process.env.APP_ROOT;

  switch (platform) {
    case 'win32':
      return path.join(basePath, 'public', 'icons', 'win', 'icon.ico');
    case 'darwin':
      return path.join(basePath, 'public', 'icons', 'mac', 'icon.icns');
    case 'linux':
    default:
      return path.join(basePath, 'public', 'icons', 'png', '256x256.png');
  }
};

const iconPath = getIconPath();

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null = null
let widgetWin: BrowserWindow | null = null
let tray: Tray | null = null
const prevRxMap: Record<string, number> = {}
const prevTxMap: Record<string, number> = {}
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
    let rawTotalDown = 0
    let rawTotalUp = 0
    
    // Sum across all valid active interfaces, bypassing loopback if possible
    for (const stat of stats) {
       if (stat.iface !== 'lo' && !stat.iface.includes('Loopback')) {
           currentRx += stat.rx_bytes
           currentTx += stat.tx_bytes
           
           if (prevRxMap[stat.iface] !== undefined) {
               const downDelta = Math.max(0, stat.rx_bytes - prevRxMap[stat.iface])
               const upDelta = Math.max(0, stat.tx_bytes - prevTxMap[stat.iface])
               saveNetworkData(stat.iface, downDelta, upDelta)
               rawTotalDown += downDelta
               rawTotalUp += upDelta
           }
           
           prevRxMap[stat.iface] = stat.rx_bytes
           prevTxMap[stat.iface] = stat.tx_bytes
       }
    }

    // 2-second moving window perfectly masks Windows performance counter 2s ticks
    downQueue.shift()
    downQueue.push(rawTotalDown)
    upQueue.shift()
    upQueue.push(rawTotalUp)

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
    icon: iconPath,
    width: 700,
    height: 600,
    resizable: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#ffffff',
      symbolColor: '#000000',
      height: 30
    },
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
    icon: iconPath,
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

ipcMain.handle('get-historical-data', () => {
  return getNetworkData()
})

ipcMain.on('win:hide', () => {
  win?.hide()
})

ipcMain.handle('get-network-interfaces', async () => {
  try {
    const interfaces = await si.networkInterfaces()
    // networkInterfaces can return an array or object
    return Array.isArray(interfaces) ? interfaces.map(i => i.iface) : []
  } catch (e) {
    return []
  }
})

ipcMain.on('clear-database', () => {
  clearDB()
})

ipcMain.on('open-database-folder', () => {
  const dbPath = getDbPath()
  if (dbPath) {
    shell.showItemInFolder(dbPath)
  }
})

app.whenReady().then(() => {
  Menu.setApplicationMenu(null)
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
