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

interface InterfaceDataMap {
  [ifaceName: string]: DailyData;
}

interface DB {
  [date: string]: InterfaceDataMap;
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

type NetworkUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';

export const NetworkHistory: React.FC = () => {
  const [data, setData] = useState<DB>({})
  const [group, setGroup] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Day')
  const [viewMode, setViewMode] = useState<'Data' | 'Graph'>('Data')
  const [unit, setUnit] = useState<NetworkUnit>('MB')
  const [interfaces, setInterfaces] = useState<string[]>([])
  const [selectedInterface, setSelectedInterface] = useState<string>('')
  const [dbStatus, setDbStatus] = useState<'fetching' | 'Ok' | 'Error'>('fetching')

  useEffect(() => {
    // Polling hook for background data
    const fetchDB = () => {
      window.ipcRenderer.invoke('get-historical-data').then((res: DB) => {
        if (res) {
          setData(res)
          setDbStatus('Ok')
        } else {
          setDbStatus('Error')
        }
      }).catch((err: unknown) => {
        console.error("Could not fetch DB", err)
        setDbStatus('Error')
      })
    }

    fetchDB()
    const intv = setInterval(fetchDB, 5000)

    // Fetch Interfaces
    window.ipcRenderer.invoke('get-network-interfaces').then((res: string[]) => {
      if (res && res.length > 0) {
        setInterfaces(res)
        setSelectedInterface(prev => prev ? prev : res[0])
      }
    }).catch(() => {})
    
    return () => clearInterval(intv)
  }, [])

  // Resolve the DB mapping to plain date -> DailyData based on active interface targeted
  const getFilteredData = (): Record<string, DailyData> => {
    const flat: Record<string, DailyData> = {}
    if (!selectedInterface || !data) return flat;
    Object.keys(data).forEach(date => {
      if (data[date] && data[date][selectedInterface]) {
        flat[date] = data[date][selectedInterface]
      }
    })
    return flat
  }

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
    const activeData = getFilteredData()
    if (group === 'Day') {
      const groupedByMonth: Record<string, { day: string, up: number, down: number }[]> = {}
      Object.keys(activeData).sort((a, b) => b.localeCompare(a)).forEach(dateStr => {
        const d = new Date(dateStr)
        const monthYear = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`
        if (!groupedByMonth[monthYear]) groupedByMonth[monthYear] = []
        groupedByMonth[monthYear].push({
          day: String(d.getDate()), up: activeData[dateStr].up, down: activeData[dateStr].down
        })
      })

      return Object.entries(groupedByMonth).map(([month, days]) => (
        <div key={month} className="mb-[15px]">
          <div className="py-1 px-2 text-foreground text-[13px] font-medium flex items-center">
            <span className="mr-[10px]">{month}</span>
            <div className="flex-1 h-[1px] bg-border" />
          </div>
          {days.map((d, i) => (
            <div key={i} className="flex text-xs py-1 px-2 text-muted-foreground">
              <div className="w-[80px]">{d.day}</div>
              <div className="flex-1 text-right">{formatStr(d.up)}</div>
              <div className="flex-1 text-right">{formatStr(d.down)}</div>
              <div className="flex-1 text-right">{formatStr(d.up + d.down)}</div>
            </div>
          ))}
        </div>
      ))
    } else if (group === 'Week') {
      const activeData = getFilteredData()
      const latestDay = Object.keys(activeData).sort().pop()
      if (!latestDay) return <div className="p-5 text-center text-xs text-muted-foreground">No data collected yet.</div>

      const baseDate = new Date(latestDay)
      const weekInfo = getWeekNumber(baseDate)
      const weekLabel = `Week ${weekInfo.week}`
      
      const currentDay = baseDate.getDay()
      const distToMon = currentDay === 0 ? 6 : currentDay - 1
      const monday = new Date(baseDate)
      monday.setDate(monday.getDate() - distToMon)
      monday.setHours(0,0,0,0)

      const daysStr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      const weekRows = []

      for (let i = 0; i < 7; i++) {
        const d = new Date(monday)
        d.setDate(monday.getDate() + i)
        const dateStr = d.toISOString().split('T')[0]
        const stats = activeData[dateStr] || { up: 0, down: 0 }
        weekRows.push({ name: daysStr[i], ...stats })
      }

      return (
        <div className="mb-[15px]">
          <div className="py-1 px-2 text-foreground text-[13px] font-medium flex items-center">
            <span className="mr-[10px]">{weekLabel}</span>
            <div className="flex-1 h-[1px] bg-border" />
          </div>
          {weekRows.map((d, i) => (
            <div key={i} className="flex text-xs py-1 px-2 text-muted-foreground">
              <div className="w-[80px]">{d.name}</div>
              <div className="flex-1 text-right">{formatStr(d.up)}</div>
              <div className="flex-1 text-right">{formatStr(d.down)}</div>
              <div className="flex-1 text-right">{formatStr(d.up + d.down)}</div>
            </div>
          ))}
        </div>
      )
    } else if (group === 'Month') {
      const groupedByYear: Record<string, Record<string, { up: number, down: number }>> = {}
      Object.keys(activeData).forEach(dateStr => {
        const d = new Date(dateStr)
        const year = String(d.getFullYear())
        const monthName = MONTH_NAMES[d.getMonth()]
        
        if (!groupedByYear[year]) groupedByYear[year] = {}
        if (!groupedByYear[year][monthName]) groupedByYear[year][monthName] = { up: 0, down: 0 }
        
        groupedByYear[year][monthName].up += activeData[dateStr].up
        groupedByYear[year][monthName].down += activeData[dateStr].down
      })

      return Object.entries(groupedByYear).sort((a,b) => b[0].localeCompare(a[0])).map(([year, months]) => (
        <div key={year} className="mb-[15px]">
          <div className="py-1 px-2 text-foreground text-[13px] font-medium flex items-center">
            <span className="mr-[10px]">{year}</span>
            <div className="flex-1 h-[1px] bg-border" />
          </div>
          {Object.entries(months).map(([monthName, obj]) => (
            <div key={monthName} className="flex text-xs py-1 px-2 text-muted-foreground">
              <div className="w-[80px]">{monthName}</div>
              <div className="flex-1 text-right">{formatStr(obj.up)}</div>
              <div className="flex-1 text-right">{formatStr(obj.down)}</div>
              <div className="flex-1 text-right">{formatStr(obj.up + obj.down)}</div>
            </div>
          ))}
        </div>
      ))
    } else {
      // Group by Year explicitly (No sub-headers)
      const yearlyTotals: Record<string, { up: number, down: number }> = {}
      Object.keys(activeData).forEach(dateStr => {
        const d = new Date(dateStr)
        const year = String(d.getFullYear())
        if (!yearlyTotals[year]) yearlyTotals[year] = { up: 0, down: 0 }
        yearlyTotals[year].up += activeData[dateStr].up
        yearlyTotals[year].down += activeData[dateStr].down
      })

      return (
        <div className="mb-[15px] pt-[10px]">
          {Object.entries(yearlyTotals).sort((a,b) => b[0].localeCompare(a[0])).map(([year, obj]) => (
            <div key={year} className="flex text-xs py-1 px-2 text-muted-foreground">
              <div className="w-[80px] font-semibold">{year}</div>
              <div className="flex-1 text-right">{formatStr(obj.up)}</div>
              <div className="flex-1 text-right">{formatStr(obj.down)}</div>
              <div className="flex-1 text-right">{formatStr(obj.up + obj.down)}</div>
            </div>
          ))}
        </div>
      )
    }
  }

  // --- CHART RENDERER ---
  const getChartData = () => {
    const activeData = getFilteredData()
    
    if (group === 'Year') {
      // Show a 5-year window with the current year at the center for better context
      const currentYear = new Date().getFullYear()
      const years = Array.from({ length: 5 }, (_, i) => (currentYear - 2 + i).toString())
      
      const yearlyTotals: Record<string, { Sent: number, Received: number }> = {}
      Object.keys(activeData).forEach(dateStr => {
        const year = new Date(dateStr).getFullYear().toString()
        if (!yearlyTotals[year]) yearlyTotals[year] = { Sent: 0, Received: 0 }
        yearlyTotals[year].Sent += activeData[dateStr].up
        yearlyTotals[year].Received += activeData[dateStr].down
      })

      return years.map(year => ({
        name: year,
        Sent: yearlyTotals[year] ? formatRaw(yearlyTotals[year].Sent) : 0,
        Received: yearlyTotals[year] ? formatRaw(yearlyTotals[year].Received) : 0
      }))
    } 
    else if (group === 'Month') {
      // Monthly breakdown for the current/latest year
      const latestDay = Object.keys(activeData).sort().pop()
      const latestYear = latestDay ? new Date(latestDay).getFullYear() : new Date().getFullYear()
      const yearData = MONTH_NAMES.map(m => ({ name: m.substring(0, 3), Sent: 0, Received: 0 }))
      
      Object.keys(activeData).forEach(dateStr => {
        const d = new Date(dateStr)
        if (d.getFullYear() === latestYear) {
          yearData[d.getMonth()].Sent += activeData[dateStr].up
          yearData[d.getMonth()].Received += activeData[dateStr].down
        }
      })
      return yearData.map(d => ({ ...d, Sent: formatRaw(d.Sent), Received: formatRaw(d.Received) }))
    }
    else if (group === 'Week') {
      // Daily breakdown for the current/latest week
      const daysStr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      const weekData = daysStr.map(m => ({ name: m, Sent: 0, Received: 0 }))
      
      const latestDay = Object.keys(activeData).sort().pop()
      const baseDate = latestDay ? new Date(latestDay) : new Date()
      
      const currentDay = baseDate.getDay()
      const distToMon = currentDay === 0 ? 6 : currentDay - 1
      const monday = new Date(baseDate)
      monday.setDate(monday.getDate() - distToMon)
      monday.setHours(0,0,0,0)
      
      Object.keys(activeData).forEach(dateStr => {
        const d = new Date(dateStr)
        d.setHours(0,0,0,0)
        const diffDays = Math.round((d.getTime() - monday.getTime()) / 86400000)
        if (diffDays >= 0 && diffDays <= 6) {
          weekData[diffDays].Sent += activeData[dateStr].up
          weekData[diffDays].Received += activeData[dateStr].down
        }
      })
      return weekData.map(d => ({ ...d, Sent: formatRaw(d.Sent), Received: formatRaw(d.Received) }))
    }
    else {
      // Day = daily breakdown for the current/latest month
      const latestDay = Object.keys(activeData).sort().pop()
      const latestDate = latestDay ? new Date(latestDay) : new Date()
      const numDays = new Date(latestDate.getFullYear(), latestDate.getMonth() + 1, 0).getDate()
      
      const monthData = Array.from({length: numDays}, (_, i) => ({ name: `${i+1}`, Sent: 0, Received: 0 }))
      Object.keys(activeData).forEach(dateStr => {
        const d = new Date(dateStr)
        if (d.getFullYear() === latestDate.getFullYear() && d.getMonth() === latestDate.getMonth()) {
          monthData[d.getDate() - 1].Sent += activeData[dateStr].up
          monthData[d.getDate() - 1].Received += activeData[dateStr].down
        }
      })
      return monthData.map(d => ({ ...d, Sent: formatRaw(d.Sent), Received: formatRaw(d.Received) }))
    }
  }

  return (
    <div className="p-5 font-sans text-foreground flex-1 flex flex-col h-full box-border">
      {/* Top Header Mock */}
      <div className="mb-5">
        <h3 className="text-sm m-0 mb-1 font-semibold">Network Interface</h3>
        <select 
          value={selectedInterface} 
          onChange={e => setSelectedInterface(e.target.value)} 
          className="w-full p-1 text-[13px] border border-border rounded-sm bg-card text-foreground"
        >
          {interfaces.length > 0 ? interfaces.map(ifc => (
            <option key={ifc} value={ifc}>{ifc}</option>
          )) : (
            <option>Fetching interfaces...</option>
          )}
        </select>
        <div className="mt-2 text-xs flex justify-between">
          <span>Database Status: <strong className={dbStatus === 'Error' ? 'ml-2 text-destructive' : 'ml-2 text-emerald-500'}>{dbStatus}</strong></span>
        </div>
      </div>

      <div className="flex gap-5 h-[400px]">
        {/* Main Content Area */}
        <div className="flex-1 border border-border bg-card flex flex-col rounded-md overflow-hidden">
          
          {viewMode === 'Data' ? (
            <>
              <div className="flex text-xs p-2 border-b border-border bg-muted/50 font-medium text-foreground">
                 <div className="w-[80px]"></div>
                 <div className="flex-1 text-right">Sent</div>
                 <div className="flex-1 text-right">Received</div>
                 <div className="flex-1 text-right">Total</div>
              </div>
              <div className="flex-1 overflow-y-auto bg-card p-2">
                 {Object.keys(getFilteredData()).length > 0 ? getTableData() : <div className="p-5 text-center text-xs text-muted-foreground">No data collected yet.</div>}
              </div>
            </>
          ) : (
            <div className="flex-1 p-5 flex justify-center items-center">
              {(() => {
                /* eslint-disable @typescript-eslint/no-explicit-any */
                const RespContainer = ResponsiveContainer as any;
                const LChart = LineChart as any;
                const XA = XAxis as any;
                const YA = YAxis as any;
                const Lgd = Legend as any;
                const Ln = Line as any;
                const RTip = RechartsTooltip as any;
                const CGrid = CartesianGrid as any;
                /* eslint-enable @typescript-eslint/no-explicit-any */

                return (
                  <RespContainer width="100%" height="100%">
                    <LChart
                      data={getChartData()}
                      margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                      <CGrid
                        strokeDasharray="3 3"
                        className="stroke-border"
                        vertical={false}
                      />
                      <XA
                        dataKey="name"
                        className="stroke-muted-foreground"
                        fontSize={11}
                        tickMargin={8}
                      />
                      <YA
                        className="stroke-muted-foreground"
                        fontSize={11}
                        width={50}
                      />
                      <RTip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          borderRadius: "0.5rem",
                          border: "1px solid var(--border)",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                          fontSize: "12px",
                          color: "var(--card-foreground)",
                        }}
                        itemStyle={{ padding: 0 }}
                      />
                      <Lgd
                        wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                      />
                      <Ln
                        type="monotone"
                        dataKey="Received"
                        stroke="var(--chart-2)"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />
                      <Ln
                        type="monotone"
                        dataKey="Sent"
                        stroke="var(--chart-5)"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />
                    </LChart>
                  </RespContainer>
                );
              })()}
            </div>
          )}
        </div>

        {/* Right Sidebar Controls */}
        <div className="w-[150px] flex flex-col text-xs">
          
          <div className="mb-4">
            <div className="mb-1 text-muted-foreground font-medium">View:</div>
            <div>
              <label className="flex items-center mb-1 cursor-pointer hover:text-primary transition-colors">
                <input type="radio" name="view" checked={viewMode === 'Data'} onChange={() => setViewMode('Data')} className="mr-2 accent-primary" />
                Data
              </label>
              <label className="flex items-center cursor-pointer hover:text-primary transition-colors">
                <input type="radio" name="view" checked={viewMode === 'Graph'} onChange={() => setViewMode('Graph')} className="mr-2 accent-primary" />
                Graph
              </label>
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-1 text-muted-foreground font-medium">Group:</div>
            <div>
              <label className="flex items-center mb-1 cursor-pointer hover:text-primary transition-colors">
                <input type="radio" name="group" checked={group === 'Day'} onChange={() => setGroup('Day')} className="mr-2 accent-primary" />
                Day
              </label>
              <label className="flex items-center mb-1 cursor-pointer hover:text-primary transition-colors">
                <input type="radio" name="group" checked={group === 'Week'} onChange={() => setGroup('Week')} className="mr-2 accent-primary" />
                Week
              </label>
              <label className="flex items-center mb-1 cursor-pointer hover:text-primary transition-colors">
                <input type="radio" name="group" checked={group === 'Month'} onChange={() => setGroup('Month')} className="mr-2 accent-primary" />
                Month
              </label>
              <label className="flex items-center cursor-pointer hover:text-primary transition-colors">
                <input type="radio" name="group" checked={group === 'Year'} onChange={() => setGroup('Year')} className="mr-2 accent-primary" />
                Year
              </label>
            </div>
          </div>

          <div className="mb-5">
             <div className="mb-1 text-muted-foreground font-medium">Unit:</div>
             <select 
               value={unit} 
               onChange={(e) => setUnit(e.target.value as NetworkUnit)} 
               className="w-full p-1 border border-border rounded-sm bg-card text-foreground"
             >
               <option value="B">B</option>
               <option value="KB">KB</option>
               <option value="MB">MB</option>
               <option value="GB">GB</option>
               <option value="TB">TB</option>
             </select>
          </div>

          <div className="mb-auto text-primary">
             <div className="text-foreground mb-1 font-medium">Database:</div>
             <div className="cursor-pointer mb-2 hover:underline opacity-90 transition-opacity" onClick={() => window.ipcRenderer.send('open-database-folder')}>Open Folder</div>
             <div className="cursor-pointer mb-1 text-destructive hover:underline opacity-90 transition-opacity" onClick={() => {
               if (window.confirm('Are you sure you want to completely erase all historical network data? This cannot be undone.')) {
                 window.ipcRenderer.send('clear-database')
               }
             }}>Clear Database</div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button className="px-2 py-1.5 bg-card text-card-foreground border border-border rounded-md cursor-pointer shadow-sm text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Warning</button>
            <button className="px-2 py-1.5 bg-card text-card-foreground border border-border rounded-md cursor-pointer shadow-sm text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors" onClick={() => window.ipcRenderer.send('win:hide')}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
