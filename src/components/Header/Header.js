import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

import "./Header.css"

export const CalendarButton = ({ onClick }) => (
  <i role="button" className="bi bi-calendar2-week text-secondary fs-4" onClick={onClick}></i>
)

export const ExchangeButton = ({ downloadJsonHref, disabledExport, onImportKanbanBoardClick }) => {
  const filename = `kanban-board-${new Date().toString().toLowerCase().split(" ").slice(0, 5).join("-")}.json`

  return (
    <DropdownButton
      as={ButtonGroup}
      variant="bg-secondary"
      title={<i className="bi bi-filetype-json"></i>}
      className="json-export-btn"
    >
      <Dropdown.Item
        href={downloadJsonHref}
        download={filename}
        disabled={disabledExport}
      >
        <i className="bi bi-box-arrow-up text-secondary fs-5 mx-1"></i>
        Export to JSON
      </Dropdown.Item>
      <Dropdown.Item onClick={onImportKanbanBoardClick}>
        <i className="bi bi-box-arrow-down text-secondary fs-5 mx-1"></i>
        Import from JSON
      </Dropdown.Item>
    </DropdownButton>
  )
}

export const SettingsButton = ({ onClick }) => (
  <i role="button" className="bi bi-gear text-secondary fs-4" onClick={onClick}></i>
)

const Header = ({
  downloadJsonHref, disabledExport,
  onSettingsClick, onCalendarClick, onImportKanbanBoardClick
}) => (
  <div className="row bg-secondary-subtle p-2 justify-content-between">
    <div className="col col-md-3 col-lg-2">
      <h3 className="m-0">Kanban Board</h3>
    </div>
    <div className="col-3 text-end">
      <CalendarButton onClick={onCalendarClick} />

      <ExchangeButton
        downloadJsonHref={downloadJsonHref}
        disabledExport={disabledExport}
        onImportKanbanBoardClick={onImportKanbanBoardClick}
      />

      <SettingsButton onClick={onSettingsClick} />
    </div>
  </div>
)

export default Header