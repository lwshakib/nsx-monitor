import { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, screen, shell, nativeTheme } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import si from 'systeminformation'
import { saveNetworkData, getNetworkData, clearDB, getDbPath } from './database'

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
let isQuitting = false
const prevRxMap: Record<string, number> = {}
const prevTxMap: Record<string, number> = {}
const downQueue = [0, 0] // Stores calculated speed (bytes/sec)
const upQueue = [0, 0]   // Stores calculated speed (bytes/sec)
let lastUpdateTime = Date.now()

function format(bytes: number) {
  const kb = bytes / 1024
  const mb = kb / 1024
  if (mb >= 10) return `${mb.toFixed(0)}M`
  if (mb >= 1) return `${mb.toFixed(1)}M`
  if (kb >= 100) return `${kb.toFixed(0)}K`
  return `${kb.toFixed(0)}K`
}

/**
 * Checks if a network interface is a virtual or internal one that should be ignored.
 */
function isVirtualInterface(iface: string): boolean {
  const name = iface.toLowerCase();
  const virtualKeywords = [
    'loopback', 'lo', 'virtualbox', 'vmware', 'vEthernet', 
    'hyper-v', 'wsl', 'tunnel', 'tap', 'vpn', 'zerotier', 
    'tailscale', 'pseudo', 'filter', 'teredo'
  ];
  return virtualKeywords.some(keyword => name.includes(keyword.toLowerCase()));
}

async function updateStats() {
  try {
    const now = Date.now()
    const dt = (now - lastUpdateTime) / 1000 // delta time in seconds
    lastUpdateTime = now

    // Ensure dt is not zero to avoid division by zero
    const safeDt = dt > 0 ? dt : 1

    const stats = await si.networkStats()
    if (!stats || stats.length === 0) {
      setTimeout(updateStats, 1000)
      return
    }

    let currentRx = 0
    let currentTx = 0
    let rawTotalDown = 0
    let rawTotalUp = 0
    
    for (const stat of stats) {
       // Filter out virtual/loopback interfaces to prevent traffic doubling
       if (!isVirtualInterface(stat.iface)) {
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

    // Convert total bytes delta during this period to bytes per second
    const normalizedDown = rawTotalDown / safeDt
    const normalizedUp = rawTotalUp / safeDt

    // 2-sample moving window for visual smoothness
    downQueue.shift()
    downQueue.push(normalizedDown)
    upQueue.shift()
    upQueue.push(normalizedUp)

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
  } finally {
    // Schedule next update after current one completes to prevent overlapping
    setTimeout(updateStats, 1000)
  }
}

function createWindow() {
  const isDark = nativeTheme.shouldUseDarkColors;
  const bgColor = isDark ? '#0f172a' : '#f1f5f9';

  win = new BrowserWindow({
    icon: iconPath,
    backgroundColor: bgColor,
    width: 700,
    height: 600,
    resizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    title: 'NSX Monitor',
    titleBarOverlay: {
      color: '#00000000',
      symbolColor: isDark ? '#ffffff' : '#000000',
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

  // Hook system theme updates dynamically
  nativeTheme.on('updated', () => {
    if (win && !win.isDestroyed()) {
      const darkState = nativeTheme.shouldUseDarkColors;
      const newBg = darkState ? '#0f172a' : '#f1f5f9';
      win.setBackgroundColor(newBg);
      win.setTitleBarOverlay({
        color: '#00000000',
        symbolColor: darkState ? '#ffffff' : '#000000'
      });
    }
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  win.on('close', (event) => {
    if (isQuitting) {
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
    title: 'NSX Speed Monitor',
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
    if (isQuitting) {
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
      isQuitting = true
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
  // Add to Windows startup organically
  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath('exe'),
  })

  Menu.setApplicationMenu(null)
  createWindow()
  createWidget()
  initTray()
  
  // Initial stats to avoid first jump
  si.networkStats().then(stats => {
    if (stats && stats.length > 0) {
      for (const stat of stats) {
        if (stat.iface !== 'lo' && !stat.iface.includes('Loopback')) {
          prevRxMap[stat.iface] = stat.rx_bytes
          prevTxMap[stat.iface] = stat.tx_bytes
        }
      }
    }
    lastUpdateTime = Date.now()
    setTimeout(updateStats, 1000)
  })
})
