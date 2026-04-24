import React, { useState, useEffect } from 'react'
import { FolderOpen, Trash2, ChevronLeft, Bell } from 'lucide-react'

interface NetworkSettingsProps {
  onBack: () => void;
}

export const NetworkSettings: React.FC<NetworkSettingsProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({ notificationsEnabled: true })

  useEffect(() => {
    window.ipcRenderer.invoke('get-app-settings').then(setSettings)
  }, [])

  const toggleNotifications = () => {
    const newSettings = { ...settings, notificationsEnabled: !settings.notificationsEnabled }
    setSettings(newSettings)
    window.ipcRenderer.send('save-app-settings', newSettings)
  }

  const handleOpenFolder = () => {
    window.ipcRenderer.send('open-database-folder')
  }

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all network history? This cannot be undone.')) {
      window.ipcRenderer.send('clear-database')
      alert('Database cleared.')
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-background font-sans p-5 box-border overflow-y-auto">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-3 p-1 rounded-full hover:bg-accent transition-colors text-foreground"
        >
          <ChevronLeft size={18} />
        </button>
        <h2 className="text-lg font-bold m-0 text-foreground">Settings</h2>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wider">Notifications</h3>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary">
                <Bell size={16} />
              </div>
              <div>
                <div className="text-[13px] font-medium text-foreground">Usage Alerts</div>
                <div className="text-[11px] text-muted-foreground">Notify when data limits are reached</div>
              </div>
            </div>
            <button 
              onClick={toggleNotifications}
              className={`w-9 h-5 rounded-full transition-colors relative ${settings.notificationsEnabled ? 'bg-primary' : 'bg-muted'}`}
            >
              <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${settings.notificationsEnabled ? 'left-5' : 'left-1'}`} />
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wider">Database Management</h3>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={handleOpenFolder}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-all text-left"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary">
                  <FolderOpen size={16} />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-foreground">Open Data Folder</div>
                  <div className="text-[11px] text-muted-foreground">View where your history is stored</div>
                </div>
              </div>
            </button>

            <button
              onClick={handleClearData}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-destructive/10 transition-all text-left group"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center mr-3 text-destructive">
                  <Trash2 size={16} />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-destructive">Clear All History</div>
                  <div className="text-[11px] text-muted-foreground">Delete all recorded network telemetry</div>
                </div>
              </div>
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wider">About</h3>
          <div className="p-3 rounded-lg bg-accent/30 text-[11px] text-muted-foreground leading-relaxed">
            NSX Monitor is a lightweight network telemetry tool designed for real-time monitoring and historical analysis.
            Built with Electron, React, and Systeminformation.
          </div>
        </section>
      </div>
    </div>
  )
}
