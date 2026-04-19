/// <reference types="vite/client" />

interface Window {
  ipcRenderer: {
    onNetworkStats: (callback: (stats: any) => void) => () => void;
    send: (channel: string, ...args: any[]) => void;
    invoke: (channel: string, ...args: any[]) => Promise<any>;
    on: (channel: string, listener: (...args: any[]) => void) => void;
    off: (channel: string, listener: (...args: any[]) => void) => void;
  }
}
