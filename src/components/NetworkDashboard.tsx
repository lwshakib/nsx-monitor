import React, { useEffect, useState } from 'react'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts'
import { ArrowDown, ArrowUp, Activity, Globe, Wifi, Zap } from 'lucide-react'

interface NetworkStats {
  down: number;
  up: number;
  totalDown: number;
  totalUp: number;
  iface: string;
  operstate: string;
}

const MAX_DATA_POINTS = 60

const formatSpeed = (bytes: number) => {
  const kb = bytes / 1024
  const mb = kb / 1024
  if (mb >= 10) return `${mb.toFixed(1)} MB/s`
  if (mb >= 1) return `${mb.toFixed(2)} MB/s`
  if (kb >= 1) return `${kb.toFixed(1)} KB/s`
  return `${bytes} B/s`
}

const formatData = (bytes: number) => {
  const gb = bytes / (1024 * 1024 * 1024)
  const mb = bytes / (1024 * 1024)
  if (gb >= 1) return `${gb.toFixed(2)} GB`
  return `${mb.toFixed(1)} MB`
}

export const NetworkDashboard: React.FC = () => {
  const [stats, setStats] = useState<NetworkStats | null>(null)
  const [history, setHistory] = useState<{ down: number; up: number; time: string }[]>([])

  useEffect(() => {
    // Initial data point to avoid empty chart
    setHistory(Array(MAX_DATA_POINTS).fill(null).map(() => ({
      down: 0,
      up: 0,
      time: ''
    })))

    const cleanup = window.ipcRenderer.onNetworkStats((newStats: NetworkStats) => {
      setStats(newStats)
      setHistory(prev => {
        const newPoint = {
          down: newStats.down,
          up: newStats.up,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }
        const updated = [...prev, newPoint]
        if (updated.length > MAX_DATA_POINTS) {
          return updated.slice(updated.length - MAX_DATA_POINTS)
        }
        return updated
      })
    })

    return cleanup
  }, [])

  const currentDown = stats?.down || 0
  const currentUp = stats?.up || 0

  return (
    <div className="app-container">
      {/* Background radial glow */}
      <div className="bg-glow"></div>

      {/* Header */}
      <div className="content-wrapper header">
        <div className="header-left">
          <div className="header-icon">
            <Activity />
          </div>
          <div>
            <h1 className="header-title">NSX MONITOR</h1>
            <p className="header-subtitle">
              <span className={`status-dot ${stats?.operstate === 'up' ? 'up' : 'down'}`}></span>
              {stats?.iface || 'Scanning Network...'} • {stats?.operstate || 'Idle'}
            </p>
          </div>
        </div>
        
        <div className="header-right">
          <span className="session-label">Session Data</span>
          <div className="session-stats">
            <div className="stat-pill down">
              <ArrowDown size={14} /> {formatData(stats?.totalDown || 0)}
            </div>
            <div className="stat-pill up">
              <ArrowUp size={14} /> {formatData(stats?.totalUp || 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="content-wrapper cards-grid">
        <div className="speed-card blue">
          <div className="content-wrapper">
            <div className="card-header">
              <span className="card-label blue">
                <ArrowDown size={16} /> Receiving
              </span>
              <Zap size={16} className="card-icon blue" />
            </div>
            <div className="speed-value">
              {formatSpeed(currentDown).split(' ')[0]}
              <span className="speed-unit">{formatSpeed(currentDown).split(' ')[1]}</span>
            </div>
            <div className="progress-bar-container">
               <div 
                 className="progress-bar blue" 
                 style={{ width: `${Math.min(100, (currentDown / (1024 * 1024 * 5)) * 100)}%` }}
               ></div>
            </div>
          </div>
          <div className="card-glow"></div>
        </div>

        <div className="speed-card purple">
          <div className="content-wrapper">
            <div className="card-header">
              <span className="card-label purple">
                <ArrowUp size={16} /> Sending
              </span>
              <Globe size={16} className="card-icon purple" />
            </div>
            <div className="speed-value">
              {formatSpeed(currentUp).split(' ')[0]}
              <span className="speed-unit">{formatSpeed(currentUp).split(' ')[1]}</span>
            </div>
            <div className="progress-bar-container">
               <div 
                 className="progress-bar purple" 
                 style={{ width: `${Math.min(100, (currentUp / (1024 * 1024 * 1)) * 100)}%` }}
               ></div>
            </div>
          </div>
          <div className="card-glow"></div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="content-wrapper chart-section">
        <div className="chart-header">
          <div className="chart-title-wrap">
            <h2 className="chart-title">
              Live Network Activity
            </h2>
            <div className="live-badge">LIVE</div>
          </div>
          <div className="chart-legend">
            <span className="legend-item blue">
              <span className="legend-color blue"></span> DOWNLOAD
            </span>
            <span className="legend-item purple">
              <span className="legend-color purple"></span> UPLOAD
            </span>
          </div>
        </div>
        
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
              <XAxis dataKey="time" hide />
              <YAxis hide domain={[0, 'auto']} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0a0c', 
                  borderColor: '#ffffff10',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  fontSize: '11px',
                  padding: '12px',
                  color: '#f1f5f9'
                }}
                itemStyle={{ padding: '2px 0' }}
                cursor={{ stroke: '#ffffff10', strokeWidth: 2 }}
              />
              <Area 
                type="monotone" 
                dataKey="down" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorDown)" 
                isAnimationActive={false}
              />
              <Area 
                type="monotone" 
                dataKey="up" 
                stroke="#a855f7" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorUp)" 
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Footer Details */}
      <div className="content-wrapper footer">
        <div className="footer-left">
          <span className="footer-item">
            <Wifi /> SAMPLING @ 1S
          </span>
          <span className="footer-item">
            <Activity /> SYSTEMINFORMATION CORE 5.22
          </span>
        </div>
        <div>
          POWERED BY NSX ENGINE
        </div>
      </div>
    </div>
  )
}
