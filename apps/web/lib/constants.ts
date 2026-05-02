import pkg from '../package.json'

const v = pkg.version
const baseUrl = `https://github.com/lwshakib/nsx-monitor/releases/download/v${v}`

export const DOWNLOAD_URLS = {
  win: `${baseUrl}/NSX-Monitor-Windows-${v}-Setup.exe`,
  mac: `${baseUrl}/NSX-Monitor-Mac-${v}-Installer.dmg`,
  lin: `${baseUrl}/NSX-Monitor-Linux-${v}.AppImage`,
} as const
