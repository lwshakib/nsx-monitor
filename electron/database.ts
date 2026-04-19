import { app } from 'electron'
import { join } from 'node:path'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const DB_FILENAME = 'network_data.json'
let dbPath = ''

interface HourlyData {
  down: number;
  up: number;
}

interface DailyData {
  down: number;
  up: number;
  hours?: HourlyData[];
}

interface DB {
  [date: string]: DailyData; // date in YYYY-MM-DD format
}

let cache: DB | null = null;
let lastFlush = Date.now();
let pendingChanges = false;

/**
 * Initializes the JSON database in the user's AppData directory
 */
export function initDB() {
  if (dbPath) return;
  dbPath = join(app.getPath('userData'), DB_FILENAME);
  try {
    if (existsSync(dbPath)) {
      const data = readFileSync(dbPath, 'utf-8');
      cache = JSON.parse(data);
    } else {
      cache = {};
      writeFileSync(dbPath, JSON.stringify(cache), 'utf-8');
    }
  } catch (error) {
    console.error('Failed to initialize local JSON database:', error);
    cache = {};
  }
}

/**
 * Record additional bytes downloaded and uploaded for a given date
 * @param downDelta Bytes downloaded since last check
 * @param upDelta Bytes uploaded since last check
 */
export function saveNetworkData(downDelta: number, upDelta: number) {
  if (!cache) initDB();
  if (downDelta === 0 && upDelta === 0) return;

  // Format date as YYYY-MM-DD local time
  const today = new Date();
  const dateStr = today.getFullYear() + '-' + 
                  String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                  String(today.getDate()).padStart(2, '0');

  if (!cache![dateStr]) {
    cache![dateStr] = { 
      down: 0, 
      up: 0, 
      hours: Array(24).fill(null).map(() => ({down: 0, up: 0}))
    };
  }
  
  if (!cache![dateStr].hours) {
    cache![dateStr].hours = Array(24).fill(null).map(() => ({down: 0, up: 0}));
  }

  const currentHour = today.getHours();

  cache![dateStr].down += downDelta;
  cache![dateStr].up += upDelta;
  if(cache![dateStr].hours && cache![dateStr].hours[currentHour]) {
     cache![dateStr].hours[currentHour].down += downDelta;
     cache![dateStr].hours[currentHour].up += upDelta;
  }
  
  pendingChanges = true;

  // Flush to disk every 60 seconds to avoid wearing out the SSD
  if (Date.now() - lastFlush > 60000) {
    flushDB();
  }
}

/**
 * Force saves any pending changes to disk immediately
 */
export function flushDB() {
  if (!pendingChanges || !cache || !dbPath) return;
  try {
    writeFileSync(dbPath, JSON.stringify(cache, null, 2), 'utf-8');
    pendingChanges = false;
    lastFlush = Date.now();
    // console.log(`[DB] Flushed network data to ${dbPath}`);
  } catch (error) {
    console.error('Failed to flush DB to disk:', error);
  }
}

// Attempt to gracefully save before app exits
app.on('will-quit', () => {
    flushDB();
});

/**
 * Returns the entire database cache for UI consumption
 */
export function getNetworkData() {
  if (!cache) initDB();
  return cache;
}
