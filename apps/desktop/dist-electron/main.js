import { app, BrowserWindow, ipcMain, shell, Menu, nativeTheme, screen, Tray, nativeImage } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path, { join } from "node:path";
import si from "systeminformation";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
const DB_FILENAME = "network_data.json";
let dbPath = "";
let cache = null;
let lastFlush = Date.now();
let pendingChanges = false;
function initDB() {
  if (dbPath) return;
  dbPath = join(app.getPath("userData"), DB_FILENAME);
  try {
    if (existsSync(dbPath)) {
      const data = readFileSync(dbPath, "utf-8");
      cache = JSON.parse(data);
      let migrated = false;
      Object.keys(cache).forEach((date) => {
        if (typeof cache[date].down === "number") {
          const legacyData = cache[date];
          cache[date] = {
            "Legacy Interface": {
              down: legacyData.down,
              up: legacyData.up,
              hours: legacyData.hours
            }
          };
          migrated = true;
        }
      });
      if (migrated) flushDB();
    } else {
      cache = {};
      writeFileSync(dbPath, JSON.stringify(cache), "utf-8");
    }
  } catch (error) {
    console.error("Failed to initialize local JSON database:", error);
    cache = {};
  }
}
function saveNetworkData(ifaceName, downDelta, upDelta) {
  if (!cache) initDB();
  if (downDelta === 0 && upDelta === 0) return;
  const today = /* @__PURE__ */ new Date();
  const dateStr = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
  if (!cache[dateStr]) cache[dateStr] = {};
  if (!cache[dateStr][ifaceName]) {
    cache[dateStr][ifaceName] = {
      down: 0,
      up: 0,
      hours: Array(24).fill(null).map(() => ({ down: 0, up: 0 }))
    };
  }
  if (!cache[dateStr][ifaceName].hours) {
    cache[dateStr][ifaceName].hours = Array(24).fill(null).map(() => ({ down: 0, up: 0 }));
  }
  const currentHour = today.getHours();
  cache[dateStr][ifaceName].down += downDelta;
  cache[dateStr][ifaceName].up += upDelta;
  if (cache[dateStr][ifaceName].hours && cache[dateStr][ifaceName].hours[currentHour]) {
    cache[dateStr][ifaceName].hours[currentHour].down += downDelta;
    cache[dateStr][ifaceName].hours[currentHour].up += upDelta;
  }
  pendingChanges = true;
  if (Date.now() - lastFlush > 6e4) {
    flushDB();
  }
}
function flushDB() {
  if (!pendingChanges || !cache || !dbPath) return;
  try {
    writeFileSync(dbPath, JSON.stringify(cache, null, 2), "utf-8");
    pendingChanges = false;
    lastFlush = Date.now();
  } catch (error) {
    console.error("Failed to flush DB to disk:", error);
  }
}
app.on("will-quit", () => {
  flushDB();
});
function getNetworkData() {
  if (!cache) initDB();
  return cache;
}
function clearDB() {
  cache = {};
  pendingChanges = true;
  flushDB();
}
function getDbPath() {
  if (!dbPath) initDB();
  return dbPath;
}
createRequire(import.meta.url);
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
const getIconPath = () => {
  const platform = process.platform;
  const basePath = process.env.APP_ROOT;
  switch (platform) {
    case "win32":
      return path.join(basePath, "public", "icons", "win", "icon.ico");
    case "darwin":
      return path.join(basePath, "public", "icons", "mac", "icon.icns");
    case "linux":
    default:
      return path.join(basePath, "public", "icons", "png", "256x256.png");
  }
};
const iconPath = getIconPath();
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win = null;
let widgetWin = null;
let tray = null;
const prevRxMap = {};
const prevTxMap = {};
const downQueue = [0, 0];
const upQueue = [0, 0];
function format(bytes) {
  const kb = bytes / 1024;
  const mb = kb / 1024;
  if (mb >= 10) return `${mb.toFixed(0)}M`;
  if (mb >= 1) return `${mb.toFixed(1)}M`;
  if (kb >= 100) return `${kb.toFixed(0)}K`;
  return `${kb.toFixed(0)}K`;
}
async function updateStats() {
  try {
    const stats = await si.networkStats();
    if (!stats || stats.length === 0) return;
    let currentRx = 0;
    let currentTx = 0;
    let rawTotalDown = 0;
    let rawTotalUp = 0;
    for (const stat of stats) {
      if (stat.iface !== "lo" && !stat.iface.includes("Loopback")) {
        currentRx += stat.rx_bytes;
        currentTx += stat.tx_bytes;
        if (prevRxMap[stat.iface] !== void 0) {
          const downDelta = Math.max(0, stat.rx_bytes - prevRxMap[stat.iface]);
          const upDelta = Math.max(0, stat.tx_bytes - prevTxMap[stat.iface]);
          saveNetworkData(stat.iface, downDelta, upDelta);
          rawTotalDown += downDelta;
          rawTotalUp += upDelta;
        }
        prevRxMap[stat.iface] = stat.rx_bytes;
        prevTxMap[stat.iface] = stat.tx_bytes;
      }
    }
    downQueue.shift();
    downQueue.push(rawTotalDown);
    upQueue.shift();
    upQueue.push(rawTotalUp);
    const down = (downQueue[0] + downQueue[1]) / 2;
    const up = (upQueue[0] + upQueue[1]) / 2;
    if (tray) {
      tray.setToolTip(`NSX Monitor
Down: ${format(down)}/s
Up: ${format(up)}/s`);
    }
    const payload = {
      down,
      up,
      totalDown: currentRx,
      totalUp: currentTx,
      iface: stats[0].iface,
      operstate: stats[0].operstate
    };
    if (win && !win.isDestroyed()) {
      win.webContents.send("network-stats", payload);
    }
    if (widgetWin && !widgetWin.isDestroyed()) {
      widgetWin.webContents.send("network-stats", payload);
    }
  } catch (error) {
    console.error("Failed to update stats:", error);
  }
}
function createWindow() {
  const isDark = nativeTheme.shouldUseDarkColors;
  const bgColor = isDark ? "#0f172a" : "#f1f5f9";
  win = new BrowserWindow({
    icon: iconPath,
    backgroundColor: bgColor,
    width: 700,
    height: 600,
    resizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#00000000",
      symbolColor: isDark ? "#ffffff" : "#000000",
      height: 30
    },
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    },
    show: false
    // Don't show immediately
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  nativeTheme.on("updated", () => {
    if (win && !win.isDestroyed()) {
      const darkState = nativeTheme.shouldUseDarkColors;
      const newBg = darkState ? "#0f172a" : "#f1f5f9";
      win.setBackgroundColor(newBg);
      win.setTitleBarOverlay({
        color: "#00000000",
        symbolColor: darkState ? "#ffffff" : "#000000"
      });
    }
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  win.on("close", (event) => {
    if (app.isQuitting) {
      win = null;
    } else {
      event.preventDefault();
      win == null ? void 0 : win.hide();
    }
  });
}
function createWidget() {
  const display = screen.getPrimaryDisplay();
  const width = 160;
  const height = 60;
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
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  if (VITE_DEV_SERVER_URL) {
    widgetWin.loadURL(`${VITE_DEV_SERVER_URL}?type=widget`);
  } else {
    widgetWin.loadFile(path.join(RENDERER_DIST, "index.html"), { query: { type: "widget" } });
  }
  widgetWin.on("close", (event) => {
    if (app.isQuitting) {
      widgetWin = null;
    } else {
      event.preventDefault();
      widgetWin == null ? void 0 : widgetWin.hide();
    }
  });
}
function initTray() {
  tray = new Tray(nativeImage.createFromPath(iconPath));
  const contextMenu = Menu.buildFromTemplate([
    { label: "NSX Monitor", enabled: false },
    { type: "separator" },
    { label: "Show Dashboard", click: () => {
      if (win) {
        win.show();
        win.focus();
      }
    } },
    { label: "Show/Hide Widget", click: () => {
      if (widgetWin) {
        widgetWin.isVisible() ? widgetWin.hide() : widgetWin.show();
      }
    } },
    { type: "separator" },
    { label: "Quit", click: () => {
      app.isQuitting = true;
      app.quit();
    } }
  ]);
  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
    if (win) {
      win.isVisible() ? win.hide() : win.show();
    }
  });
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    createWidget();
  }
});
ipcMain.handle("get-historical-data", () => {
  return getNetworkData();
});
ipcMain.on("win:hide", () => {
  win == null ? void 0 : win.hide();
});
ipcMain.handle("get-network-interfaces", async () => {
  try {
    const interfaces = await si.networkInterfaces();
    return Array.isArray(interfaces) ? interfaces.map((i) => i.iface) : [];
  } catch (e) {
    return [];
  }
});
ipcMain.on("clear-database", () => {
  clearDB();
});
ipcMain.on("open-database-folder", () => {
  const dbPath2 = getDbPath();
  if (dbPath2) {
    shell.showItemInFolder(dbPath2);
  }
});
app.whenReady().then(() => {
  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath("exe")
  });
  Menu.setApplicationMenu(null);
  createWindow();
  createWidget();
  initTray();
  si.networkStats().then((stats) => {
    if (stats && stats.length > 0) {
      for (const stat of stats) {
        if (stat.iface !== "lo" && !stat.iface.includes("Loopback")) {
          prevRxMap[stat.iface] = stat.rx_bytes;
          prevTxMap[stat.iface] = stat.tx_bytes;
        }
      }
    }
  });
  setInterval(updateStats, 1e3);
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
