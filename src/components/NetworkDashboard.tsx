import React from 'react'
import { NetworkHistory } from './NetworkHistory'

export const NetworkDashboard: React.FC = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-background text-foreground">
      {/* Custom Title Bar */}
      <div 
        className="h-[30px] flex items-center pl-[10px] select-none"
        style={{ WebkitAppRegion: 'drag' as any }}
      >
        <img src="/logo.svg" alt="logo" className="w-4 h-4 mr-2" />
        <span className="text-xs font-sans text-foreground">NSX Monitor</span>
      </div>
      {/* Rest of the empty dashboard */}
      <div className="flex-1">
        <NetworkHistory />
      </div>
    </div>
  )
}
