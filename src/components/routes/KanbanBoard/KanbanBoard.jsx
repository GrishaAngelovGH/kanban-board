import { useState, useEffect, useCallback } from "react"

import Layout from "components/Layout"
import Header from "components/Header"
import KanbanBoard from "components/KanbanBoard"
import Users from "components/Users"
import Settings from "components/Settings"

import boardRepository from "persistent/persistentKanbanBoardRepository"
import settingsRepository from "persistent/persistentSettingsRepository"
import history from "persistent/history"

const KanbanBoardRoute = ({ showToastWithMessage }) => {
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
    const title = boardRepository.getBoardTitle()
    const columns = boardRepository.getStringifiedColumns()
    const historyColumns = history.getStringifiedColumns()

    const jsonString = `{"title": "${title}", "columns": ${columns}, "history": ${historyColumns}}`
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

  const headerHandlers = {
    onCalendarClick: toggleCalendar,
    onImportKanbanBoardClick: toggleUploadKanbanBoardModal,
    onSettingsClick: toggleSettings,
    onUsersClick: toggleUsers,
    onUpdate: prepareJsonFileDownload
  }

  return (
    <div className="container-fluid">
      <Layout
        header={
          <Header
            downloadJsonHref={downloadJsonHref}
            disabledExport={disabledExport}
            handlers={headerHandlers}
          />
        }
        body={
          <KanbanBoard
            showCalendar={showCalendar}
            showUploadBoardModal={showUploadBoardModal}
            onUpdate={prepareJsonFileDownload}
            onToggleUploadKanbanBoardModal={toggleUploadKanbanBoardModal}
            showToastWithMessage={showToastWithMessage}
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

export default KanbanBoardRoute
