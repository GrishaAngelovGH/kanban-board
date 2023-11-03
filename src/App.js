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
  const [showUploadBoardModal, setShowUploadBoardModal] = useState(false)

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const handleKanbanBoardUpdate = () => {
    const jsonString = boardRepository.getStringifiedColumns()
    const blob = new Blob([jsonString], { type: "application/json" })
    setDownloadJsonHref(URL.createObjectURL(blob))
  }

  const toggleUploadKanbanBoardModal = () => {
    setShowUploadBoardModal(!showUploadBoardModal)
  }

  const handleConfirmSettings = settings => {
    settingsRepository.saveSettings(settings)
    setShowSettings(false)
  }

  const disabledExport = !boardRepository.getColumns().length

  return (
    <div className="container-fluid">
      <Layout
        header={
          <Header
            downloadJsonHref={downloadJsonHref}
            disabledExport={disabledExport}
            onCalendarClick={toggleCalendar}
            onImportKanbanBoardClick={toggleUploadKanbanBoardModal}
            onSettingsClick={toggleSettings}
          />
        }
        body={
          <KanbanBoard
            showCalendar={showCalendar}
            showUploadBoardModal={showUploadBoardModal}
            onUpdate={handleKanbanBoardUpdate}
            onToggleUploadKanbanBoardModal={toggleUploadKanbanBoardModal}
          />
        }
      />

      <Settings
        show={showSettings}
        onClose={toggleSettings}
        onConfirm={handleConfirmSettings}
      />
    </div>
  );
}

export default App;
