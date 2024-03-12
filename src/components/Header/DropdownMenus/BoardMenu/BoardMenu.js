import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

import boardRepository from "persistent/persistentKanbanBoardRepository"

import "../DropdownMenu.css"

const BoardMenu = ({
  downloadJsonHref, disabledExport,
  onUsersClick, onSettingsClick, onCalendarClick, onImportKanbanBoardClick, onUpdate
}) => {
  const filename = `kanban-board-${new Date().toString().toLowerCase().split(" ").slice(0, 5).join("-")}.json`

  const menuItems = [
    {
      label: "Toggle Fullscreen",
      icon: "bi bi-arrows-fullscreen",
      onClick: () => {
        const isFullScreen = window.document.fullscreenElement

        isFullScreen ?
          window.document.exitFullscreen() :
          window.document.documentElement.requestFullscreen()
      }
    },
    { label: "Toggle Calendar", icon: "bi bi-calendar2-week", onClick: onCalendarClick },
    { label: "Export to JSON", icon: "bi bi-box-arrow-up", href: downloadJsonHref, download: filename, disabled: disabledExport },
    { label: "Import from JSON", icon: "bi bi-box-arrow-down", onClick: onImportKanbanBoardClick },
    { label: "Manage Users", icon: "bi bi-people", onClick: onUsersClick },
    {
      label: "Group Templates", icon: "bi bi-collection",
      disabled: !boardRepository.getColumns().length,
      onClick: () => {
        boardRepository.relocateTemplatesInColumn()
        onUpdate()
      }
    },
    { label: "History", icon: "bi bi-clock-history", href: "/history" },
    { label: "Settings", icon: "bi bi-gear", onClick: onSettingsClick }
  ]

  return (
    <DropdownButton className="dropdown-menu-header" as={ButtonGroup} size="sm" variant="light" title={<i className="bi bi-grid-fill text-primary"></i>}>
      {
        menuItems.map((v, i) => (
          <Dropdown.Item key={i} {...v}>
            <i className={v.icon}></i>
            <span className="mx-2">{v.label}</span>
          </Dropdown.Item>
        ))
      }
    </DropdownButton>
  )
}

export default BoardMenu