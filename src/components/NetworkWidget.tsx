import React, { useEffect, useState } from 'react'

const formatSpeed = (bytes: number) => {
  const kb = bytes / 1024
  const mb = kb / 1024
  if (mb >= 10) return `${mb.toFixed(1)} MB/s`
  if (mb >= 1) return `${mb.toFixed(2)} MB/s`
  if (kb >= 1) return `${kb.toFixed(0)} KB/s`
  return `${bytes} B/s`
}

export const NetworkWidget: React.FC = () => {
  const [down, setDown] = useState(0)
  const [up, setUp] = useState(0)

  useEffect(() => {
    // Enable transparent body and html
    document.documentElement.classList.add('widget-mode')
    document.body.classList.add('widget-mode')
    
    const cleanup = window.ipcRenderer.onNetworkStats((stats: any) => {
      setDown(stats.down)
      setUp(stats.up)
    })

    return () => {
      document.documentElement.classList.remove('widget-mode')
      document.body.classList.remove('widget-mode')
      cleanup()
    }
  }, [])

  return (
    <div className="widget-container">
      <div className="widget-row">
        <span>↓</span>
        <span className="widget-value">{formatSpeed(down)}</span>
      </div>
      <div className="widget-row" style={{ marginTop: '2px' }}>
        <span>↑</span>
        <span className="widget-value">{formatSpeed(up)}</span>
      </div>
    </div>
  )
}
