import React, { useEffect, useState } from 'react'

interface DailyData {
  down: number;
  up: number;
}

interface DB {
  [date: string]: DailyData;
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export const NetworkHistory: React.FC = () => {
  const [data, setData] = useState<DB>({})
  const [group, setGroup] = useState<'Day' | 'Month'>('Day')
  const [unit, setUnit] = useState<'MB' | 'GB' | 'KB'>('MB')

  useEffect(() => {
    // Note: requires window.ipcRenderer.invoke from preload
    window.ipcRenderer.invoke('get-historical-data').then((res: DB) => {
      if (res) setData(res)
    }).catch((err: any) => console.error("Could not fetch DB", err))
  }, [])

  const getMultiplier = () => {
    if (unit === 'KB') return 1024;
    if (unit === 'MB') return 1024 * 1024;
    if (unit === 'GB') return 1024 * 1024 * 1024;
    return 1;
  }

  const formatVal = (bytes: number) => {
    return (bytes / getMultiplier()).toFixed(0);
  }

  // Aggregate data for rendering
  // Returns sections to map over
  const getRenderData = () => {
    if (group === 'Day') {
      const groupedByMonth: Record<string, { day: string, up: number, down: number }[]> = {}
      
      Object.keys(data).sort((a, b) => b.localeCompare(a)).forEach(dateStr => {
        const d = new Date(dateStr)
        const monthYear = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`
        if (!groupedByMonth[monthYear]) groupedByMonth[monthYear] = []
        
        groupedByMonth[monthYear].push({
          day: String(d.getDate()),
          up: data[dateStr].up,
          down: data[dateStr].down
        })
      })

      return Object.entries(groupedByMonth).map(([month, days]) => (
        <div key={month} style={{ marginBottom: '15px' }}>
          <div style={{ padding: '4px 8px', color: '#3b82f6', borderBottom: '1px solid #e1e4e8', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>{month}</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e1e4e8' }} />
          </div>
          {days.map(d => (
            <div key={d.day} style={{ display: 'flex', fontSize: '12px', padding: '4px 8px', color: '#1e293b' }}>
              <div style={{ width: '80px' }}>{d.day}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatVal(d.up)}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatVal(d.down)}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatVal(d.up + d.down)}</div>
            </div>
          ))}
        </div>
      ))
    } else {
      // Group by Month
      const groupedByYear: Record<string, Record<string, { up: number, down: number }>> = {}
      Object.keys(data).forEach(dateStr => {
        const d = new Date(dateStr)
        const year = String(d.getFullYear())
        const monthName = MONTH_NAMES[d.getMonth()]
        
        if (!groupedByYear[year]) groupedByYear[year] = {}
        if (!groupedByYear[year][monthName]) groupedByYear[year][monthName] = { up: 0, down: 0 }
        
        groupedByYear[year][monthName].up += data[dateStr].up
        groupedByYear[year][monthName].down += data[dateStr].down
      })

      return Object.entries(groupedByYear).sort((a,b) => b[0].localeCompare(a[0])).map(([year, months]) => (
        <div key={year} style={{ marginBottom: '15px' }}>
          <div style={{ padding: '4px 8px', color: '#3b82f6', borderBottom: '1px solid #e1e4e8', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>{year}</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e1e4e8' }} />
          </div>
          {Object.entries(months).map(([monthName, obj]) => (
            <div key={monthName} style={{ display: 'flex', fontSize: '12px', padding: '4px 8px', color: '#1e293b' }}>
              <div style={{ width: '80px' }}>{monthName}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatVal(obj.up)}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatVal(obj.down)}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatVal(obj.up + obj.down)}</div>
            </div>
          ))}
        </div>
      ))
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', color: '#333' }}>
      
      {/* Top Header Mock */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '14px', margin: '0 0 5px 0', fontWeight: 600 }}>Network Interface</h3>
        <select style={{ width: '100%', padding: '4px', fontSize: '13px', border: '1px solid #ccc', borderRadius: '2px', backgroundColor: '#fff' }}>
          <option>Realtek PCIe GbE Family Controller</option>
        </select>
        <div style={{ marginTop: '10px', fontSize: '12px' }}>
          Database Status: <span style={{ marginLeft: '20px' }}>Ok</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', height: '400px' }}>
        {/* Table Area */}
        <div style={{ flex: 1, border: '1px solid #ccc', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
          {/* Table Header */}
          <div style={{ display: 'flex', fontSize: '12px', padding: '8px', borderBottom: '1px solid #ccc', backgroundColor: '#fafafa', fontWeight: 500 }}>
             <div style={{ width: '80px' }}></div>
             <div style={{ flex: 1, textAlign: 'right' }}>Sent</div>
             <div style={{ flex: 1, textAlign: 'right' }}>Received</div>
             <div style={{ flex: 1, textAlign: 'right' }}>Total</div>
          </div>
          
          {/* Table Body (Scrollable) */}
          <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#fff' }}>
             {Object.keys(data).length > 0 ? getRenderData() : <div style={{ padding: '20px', textAlign: 'center', fontSize: '12px', color: '#888' }}>No data collected yet.</div>}
          </div>
        </div>

        {/* Right Sidebar Controls */}
        <div style={{ width: '150px', display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '5px' }}>Group:</div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', cursor: 'pointer' }}>
                <input type="radio" name="group" checked={group === 'Day'} onChange={() => setGroup('Day')} style={{ marginRight: '5px' }} />
                Day
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="radio" name="group" checked={group === 'Month'} onChange={() => setGroup('Month')} style={{ marginRight: '5px' }} />
                Month
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
             <div style={{ marginBottom: '5px' }}>Unit:</div>
             <select value={unit} onChange={(e) => setUnit(e.target.value as any)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
               <option value="MB">MB</option>
               <option value="GB">GB</option>
               <option value="KB">KB</option>
             </select>
          </div>

          <div style={{ marginBottom: 'auto', color: '#3b82f6' }}>
             <div style={{ color: '#333', marginBottom: '5px' }}>Database:</div>
             <div style={{ cursor: 'pointer', marginBottom: '5px' }}>Import Wizard</div>
             <div style={{ cursor: 'pointer', marginBottom: '5px' }}>Export Wizard</div>
             <div style={{ cursor: 'pointer', marginBottom: '5px' }}>Clear Database</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button style={{ padding: '8px', backgroundColor: '#ffffff', color: '#374151', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', fontSize: '12px', fontWeight: 500, transition: 'all 0.2s' }}>Warning</button>
            <button style={{ padding: '8px', backgroundColor: '#ffffff', color: '#374151', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', fontSize: '12px', fontWeight: 500, transition: 'all 0.2s' }} onClick={() => window.ipcRenderer.send('win:hide')}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
