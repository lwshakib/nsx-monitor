import React from 'react'
import { NetworkHistory } from './NetworkHistory'

export const NetworkDashboard: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#ffffff', width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Custom Title Bar */}
      <div style={{ 
        height: '30px', 
        display: 'flex', 
        alignItems: 'center', 
        paddingLeft: '10px',
        WebkitAppRegion: 'drag' as any,
        userSelect: 'none'
      }}>
        <img src="/logo.svg" alt="logo" style={{ width: '16px', height: '16px', marginRight: '8px' }} />
        <span style={{ fontSize: '12px', color: '#000000', fontFamily: 'sans-serif' }}>NSX Monitor</span>
      </div>
      {/* Rest of the empty dashboard */}
      <div style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
        <NetworkHistory />
      </div>
    </div>
  )
}
