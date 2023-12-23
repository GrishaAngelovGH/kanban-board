import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const Header = ({ downloadJsonHref, disabledExport, handlers }) => {
  const { onUsersClick, onSettingsClick, onCalendarClick, onImportKanbanBoardClick, onUpdate } = handlers

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
      label: "Group Templates", icon: "bi bi-collection", onClick: () => {
        boardRepository.relocateTemplatesInColumn()
        onUpdate()
      }
    },
    { label: "Settings", icon: "bi bi-gear", onClick: onSettingsClick }
  ]

  return (
    <div className="row bg-secondary-subtle p-2 justify-content-between align-items-center">
      <div className="col-4 col-md-4 col-lg-3">
        <h3 className="m-0">Kanban Board</h3>
      </div>
      <div className="col-8 col-md-4 col-lg-3 text-end">
        <DropdownButton as={ButtonGroup} size="sm" variant="light" title={<i className="bi bi-grid-fill text-primary"></i>}>
          {
            menuItems.map((v, i) => (
              <Dropdown.Item key={i} {...v}>
                <i className={v.icon}></i>
                <span className="mx-2">{v.label}</span>
              </Dropdown.Item>
            ))
          }
        </DropdownButton>
      </div>
    </div>
  )
}

export default Header