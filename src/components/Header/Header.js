import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

import "./Header.css"

const Header = ({ downloadJsonHref, onSettingsClick, onCalendarClick }) => {


  const filename = `kanban-board-${new Date().toString().toLowerCase().split(" ").slice(0, 5).join("-")}.json`

  return (
    <div className="row bg-secondary-subtle p-2 justify-content-between">
      <div className="col col-md-3 col-lg-2">
        <h3 className="m-0">Kanban Board</h3>
      </div>
      <div className="col-3 text-end">
        <i role="button" className="bi bi-calendar2-week text-secondary fs-4" onClick={onCalendarClick}></i>

        <DropdownButton
          as={ButtonGroup}
          variant="bg-secondary"
          title={<i className="bi bi-filetype-json"></i>}
          className="json-export-btn"
        >
          <Dropdown.Item
            href={downloadJsonHref}
            download={filename}
          >
            <i className="bi bi-box-arrow-up text-secondary fs-5 mx-1"></i>
            Export to JSON
          </Dropdown.Item>
        </DropdownButton>

        <i role="button" className="bi bi-gear text-secondary fs-4" onClick={onSettingsClick}></i>
      </div>
    </div>
  )
}

export default Header