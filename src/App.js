import { useState } from "react"

import Layout from "components/Layout"
import Header from "components/Header"
import KanbanBoard from "components/KanbanBoard"
import Settings from "components/Settings"

import settingsRepository from "persistent/persistentSettingsRepository"

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const handleConfirm = settings => {
    settingsRepository.saveSettings(settings)
    setShowSettings(false)
  }

  return (
    <div className="container-fluid">
      <Layout
        header={<Header onSettingsClick={toggleSettings} onCalendarClick={toggleCalendar} />}
        body={<KanbanBoard showCalendar={showCalendar} />}
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
