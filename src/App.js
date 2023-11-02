import { useState } from "react"

import Layout from "components/Layout"
import Header from "components/Header"
import KanbanBoard from "components/KanbanBoard"
import Settings from "components/Settings"

import boardRepository from "persistent/persistentKanbanBoardRepository"
import settingsRepository from "persistent/persistentSettingsRepository"

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [downloadJsonHref, setDownloadJsonHref] = useState("")

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const handleKanbanBoardUpdate = () => {
    const jsonString = boardRepository.getStringifiedColumns()
    const blob = new Blob([jsonString], { type: 'application/json' })
    setDownloadJsonHref(URL.createObjectURL(blob))
  }

  const handleConfirm = settings => {
    settingsRepository.saveSettings(settings)
    setShowSettings(false)
  }

  return (
    <div className="container-fluid">
      <Layout
        header={<Header downloadJsonHref={downloadJsonHref} onSettingsClick={toggleSettings} onCalendarClick={toggleCalendar} />}
        body={<KanbanBoard showCalendar={showCalendar} onUpdate={handleKanbanBoardUpdate} />}
      />

      <Settings
        show={showSettings}
        onClose={toggleSettings}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default App;
