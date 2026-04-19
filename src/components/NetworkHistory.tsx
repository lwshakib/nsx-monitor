import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts'

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
  [date: string]: DailyData;
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

// Compute ISO week of the year
function getWeekNumber(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay()||7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
  const weekNo = Math.ceil(( ( (date.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
  return { year: date.getUTCFullYear(), week: weekNo };
}

export const NetworkHistory: React.FC = () => {
  const [data, setData] = useState<DB>({})
  const [group, setGroup] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Day')
  const [viewMode, setViewMode] = useState<'Data' | 'Graph'>('Data')
  const [unit, setUnit] = useState<'B' | 'KB' | 'MB' | 'GB' | 'TB'>('MB')
  const [interfaces, setInterfaces] = useState<string[]>([])
  const [dbStatus, setDbStatus] = useState<'fetching' | 'Ok' | 'Error'>('fetching')

  useEffect(() => {
    // Fetch DB
    window.ipcRenderer.invoke('get-historical-data').then((res: DB) => {
      if (res) {
        setData(res)
        setDbStatus('Ok')
      } else {
        setDbStatus('Error')
      }
    }).catch((err: any) => {
      console.error("Could not fetch DB", err)
      setDbStatus('Error')
    })

    // Fetch Interfaces
    window.ipcRenderer.invoke('get-network-interfaces').then((res: string[]) => {
      if (res && res.length > 0) setInterfaces(res)
    }).catch(() => {})
  }, [])

  const getMultiplier = () => {
    if (unit === 'KB') return 1024;
    if (unit === 'MB') return 1024 ** 2;
    if (unit === 'GB') return 1024 ** 3;
    if (unit === 'TB') return 1024 ** 4;
    return 1; // 'B'
  }

  const formatRaw = (bytes: number) => {
    return Number((bytes / getMultiplier()).toFixed(2));
  }

  const formatStr = (bytes: number) => {
    return (bytes / getMultiplier()).toFixed(0);
  }

  // --- TABLE RENDERER ---
  const getTableData = () => {
    if (group === 'Day') {
      const groupedByMonth: Record<string, { day: string, up: number, down: number }[]> = {}
      Object.keys(data).sort((a, b) => b.localeCompare(a)).forEach(dateStr => {
        const d = new Date(dateStr)
        const monthYear = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`
        if (!groupedByMonth[monthYear]) groupedByMonth[monthYear] = []
        groupedByMonth[monthYear].push({
          day: String(d.getDate()), up: data[dateStr].up, down: data[dateStr].down
        })
      })

      return Object.entries(groupedByMonth).map(([month, days]) => (
        <div key={month} style={{ marginBottom: '15px' }}>
          <div style={{ padding: '4px 8px', color: '#1f2937', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>{month}</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e1e4e8' }} />
          </div>
          {days.map((d, i) => (
            <div key={i} style={{ display: 'flex', fontSize: '12px', padding: '4px 8px', color: '#1e293b' }}>
              <div style={{ width: '80px' }}>{d.day}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatStr(d.up)}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatStr(d.down)}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatStr(d.up + d.down)}</div>
            </div>
          ))}
        </div>
      ))
    } else if (group === 'Week') {
      const groupedByYear: Record<string, Record<string, { up: number, down: number }>> = {}
      Object.keys(data).forEach(dateStr => {
        const d = new Date(dateStr)
        const weekInfo = getWeekNumber(d)
        const year = String(weekInfo.year)
        const weekLabel = `Week ${weekInfo.week}`
        
        if (!groupedByYear[year]) groupedByYear[year] = {}
        if (!groupedByYear[year][weekLabel]) groupedByYear[year][weekLabel] = { up: 0, down: 0 }
        
        groupedByYear[year][weekLabel].up += data[dateStr].up
        groupedByYear[year][weekLabel].down += data[dateStr].down
      })

      return Object.entries(groupedByYear).sort((a,b) => b[0].localeCompare(a[0])).map(([year, weeks]) => (
        <div key={year} style={{ marginBottom: '15px' }}>
          <div style={{ padding: '4px 8px', color: '#1f2937', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>{year}</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e1e4e8' }} />
          </div>
          {Object.entries(weeks).sort((a,b) => parseInt(a[0].split(' ')[1]) - parseInt(b[0].split(' ')[1])).map(([weekLabel, obj]) => (
            <div key={weekLabel} style={{ display: 'flex', fontSize: '12px', padding: '4px 8px', color: '#1e293b' }}>
              <div style={{ width: '80px' }}>{weekLabel}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatStr(obj.up)}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatStr(obj.down)}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatStr(obj.up + obj.down)}</div>
            </div>
          ))}
        </div>
      ))
    } else if (group === 'Month') {
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
          <div style={{ padding: '4px 8px', color: '#1f2937', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>{year}</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e1e4e8' }} />
          </div>
          {Object.entries(months).map(([monthName, obj]) => (
            <div key={monthName} style={{ display: 'flex', fontSize: '12px', padding: '4px 8px', color: '#1e293b' }}>
              <div style={{ width: '80px' }}>{monthName}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatStr(obj.up)}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatStr(obj.down)}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatStr(obj.up + obj.down)}</div>
            </div>
          ))}
        </div>
      ))
    } else {
      // Group by Year explicitly (No sub-headers)
      const yearlyTotals: Record<string, { up: number, down: number }> = {}
      Object.keys(data).forEach(dateStr => {
        const d = new Date(dateStr)
        const year = String(d.getFullYear())
        if (!yearlyTotals[year]) yearlyTotals[year] = { up: 0, down: 0 }
        yearlyTotals[year].up += data[dateStr].up
        yearlyTotals[year].down += data[dateStr].down
      })

      return (
        <div style={{ marginBottom: '15px', paddingTop: '10px' }}>
          {Object.entries(yearlyTotals).sort((a,b) => b[0].localeCompare(a[0])).map(([year, obj]) => (
            <div key={year} style={{ display: 'flex', fontSize: '12px', padding: '4px 8px', color: '#1e293b' }}>
              <div style={{ width: '80px', fontWeight: 600 }}>{year}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatStr(obj.up)}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatStr(obj.down)}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{formatStr(obj.up + obj.down)}</div>
            </div>
          ))}
        </div>
      )
    }
  }

  // --- CHART RENDERER ---
  const getChartData = () => {
    if (group === 'Year') {
      const yearData = MONTH_NAMES.map(m => ({ name: m.substring(0, 3), Sent: 0, Received: 0 }));
      Object.keys(data).forEach(dateStr => {
        const d = new Date(dateStr);
        yearData[d.getMonth()].Sent += data[dateStr].up;
        yearData[d.getMonth()].Received += data[dateStr].down;
      });
      return yearData.map(d => ({ ...d, Sent: formatRaw(d.Sent), Received: formatRaw(d.Received)}));
    } 
    else if (group === 'Week') {
      const weekData = Array.from({length: 53}, (_, i) => ({ name: `W${i+1}`, Sent: 0, Received: 0 }));
      Object.keys(data).forEach(dateStr => {
        const d = new Date(dateStr);
        const wInfo = getWeekNumber(d);
        if (wInfo.week >= 1 && wInfo.week <= 53) {
          weekData[wInfo.week - 1].Sent += data[dateStr].up;
          weekData[wInfo.week - 1].Received += data[dateStr].down;
        }
      });
      // Filter out empty trailing weeks purely for visual padding, retain up to current active
      return weekData.filter(d => d.Sent > 0 || d.Received > 0 || parseInt(d.name.substring(1)) <= getWeekNumber(new Date()).week)
                     .map(d => ({ ...d, Sent: formatRaw(d.Sent), Received: formatRaw(d.Received)}));
    }
    else if (group === 'Month') {
      const monthData = Array.from({length: 31}, (_, i) => ({ name: `${i+1}`, Sent: 0, Received: 0 }));
      Object.keys(data).forEach(dateStr => {
        const d = new Date(dateStr);
        monthData[d.getDate() - 1].Sent += data[dateStr].up;
        monthData[d.getDate() - 1].Received += data[dateStr].down;
      });
      return monthData.map(d => ({ ...d, Sent: formatRaw(d.Sent), Received: formatRaw(d.Received)}));
    } 
    else {
      // Day = 24 hours of the most recent active day
      const latestDay = Object.keys(data).sort().pop();
      if (!latestDay || !data[latestDay].hours) {
        return Array.from({length: 24}, (_, i) => ({ name: `${i}:00`, Sent: 0, Received: 0 }));
      }
      return data[latestDay].hours!.map((h, i) => ({ 
        name: `${i}:00`, 
        Sent: formatRaw(h.up), 
        Received: formatRaw(h.down)
      }));
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', color: '#333' }}>
      {/* Top Header Mock */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '14px', margin: '0 0 5px 0', fontWeight: 600 }}>Network Interface</h3>
        <select style={{ width: '100%', padding: '4px', fontSize: '13px', border: '1px solid #ccc', borderRadius: '2px', backgroundColor: '#fff' }}>
          {interfaces.length > 0 ? interfaces.map(ifc => (
            <option key={ifc} value={ifc}>{ifc}</option>
          )) : (
            <option>Fetching interfaces...</option>
          )}
        </select>
        <div style={{ marginTop: '10px', fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>
          <span>Database Status: <strong style={{ marginLeft: '10px', color: dbStatus === 'Error' ? '#ef4444' : '#10b981' }}>{dbStatus}</strong></span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', height: '400px' }}>
        {/* Main Content Area */}
        <div style={{ flex: 1, border: '1px solid #ccc', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
          
          {viewMode === 'Data' ? (
            <>
              <div style={{ display: 'flex', fontSize: '12px', padding: '8px', borderBottom: '1px solid #ccc', backgroundColor: '#fafafa', fontWeight: 500 }}>
                 <div style={{ width: '80px' }}></div>
                 <div style={{ flex: 1, textAlign: 'right' }}>Sent</div>
                 <div style={{ flex: 1, textAlign: 'right' }}>Received</div>
                 <div style={{ flex: 1, textAlign: 'right' }}>Total</div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#fff' }}>
                 {Object.keys(data).length > 0 ? getTableData() : <div style={{ padding: '20px', textAlign: 'center', fontSize: '12px', color: '#888' }}>No data collected yet.</div>}
              </div>
            </>
          ) : (
            <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getChartData()} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickMargin={8} />
                  <YAxis stroke="#9ca3af" fontSize={11} width={50} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontSize: '12px' }}
                    itemStyle={{ padding: 0 }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="Received" stroke="#3b82f6" strokeWidth={2} dot={{r:3}} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Sent" stroke="#a855f7" strokeWidth={2} dot={{r:3}} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Right Sidebar Controls */}
        <div style={{ width: '150px', display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
          
          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '5px' }}>View:</div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', cursor: 'pointer' }}>
                <input type="radio" name="view" checked={viewMode === 'Data'} onChange={() => setViewMode('Data')} style={{ marginRight: '5px' }} />
                Data
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="radio" name="view" checked={viewMode === 'Graph'} onChange={() => setViewMode('Graph')} style={{ marginRight: '5px' }} />
                Graph
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '5px' }}>Group:</div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', cursor: 'pointer' }}>
                <input type="radio" name="group" checked={group === 'Day'} onChange={() => setGroup('Day')} style={{ marginRight: '5px' }} />
                Day
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', cursor: 'pointer' }}>
                <input type="radio" name="group" checked={group === 'Week'} onChange={() => setGroup('Week')} style={{ marginRight: '5px' }} />
                Week
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', cursor: 'pointer' }}>
                <input type="radio" name="group" checked={group === 'Month'} onChange={() => setGroup('Month')} style={{ marginRight: '5px' }} />
                Month
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="radio" name="group" checked={group === 'Year'} onChange={() => setGroup('Year')} style={{ marginRight: '5px' }} />
                Year
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
             <div style={{ marginBottom: '5px' }}>Unit:</div>
             <select value={unit} onChange={(e) => setUnit(e.target.value as any)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
               <option value="B">B</option>
               <option value="KB">KB</option>
               <option value="MB">MB</option>
               <option value="GB">GB</option>
               <option value="TB">TB</option>
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
