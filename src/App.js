import { useState, useEffect, useCallback } from "react"

import Layout from "components/Layout"
import Header from "components/Header"
import KanbanBoard from "components/KanbanBoard"
import Users from "components/Users"
import Settings from "components/Settings"

import boardRepository from "persistent/persistentKanbanBoardRepository"
import settingsRepository from "persistent/persistentSettingsRepository"

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showUsers, setShowUsers] = useState(false)
  const [downloadJsonHref, setDownloadJsonHref] = useState("")
  const [showUploadBoardModal, setShowUploadBoardModal] = useState(false)

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const toggleUsers = () => {
    setShowUsers(!showUsers)
  }

  const prepareJsonFileDownload = useCallback(() => {
    const columns = boardRepository.getStringifiedColumns()
    const title = boardRepository.getBoardTitle()
    const jsonString = `{"title": "${title}", "columns": ${columns}}`
    const blob = new Blob([jsonString], { type: "application/json" })
    setDownloadJsonHref(URL.createObjectURL(blob))
  }, [])

  const toggleUploadKanbanBoardModal = () => {
    setShowUploadBoardModal(!showUploadBoardModal)
  }

  const handleConfirmSettings = settings => {
    settingsRepository.saveSettings(settings)
    setShowSettings(false)
  }

  useEffect(prepareJsonFileDownload, [prepareJsonFileDownload])

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
            onUsersClick={toggleUsers}
            onUpdate={prepareJsonFileDownload}
          />
        }
        body={
          <KanbanBoard
            showCalendar={showCalendar}
            showUploadBoardModal={showUploadBoardModal}
            onUpdate={prepareJsonFileDownload}
            onToggleUploadKanbanBoardModal={toggleUploadKanbanBoardModal}
          />
        }
      />

      <Users
        show={showUsers}
        onClose={toggleUsers}
        onUpdate={prepareJsonFileDownload}
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
