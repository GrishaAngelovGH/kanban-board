import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

const ExchangeButton = ({ downloadJsonHref, disabledExport, onImportKanbanBoardClick }) => {
  const filename = `kanban-board-${new Date().toString().toLowerCase().split(" ").slice(0, 5).join("-")}.json`

  return (
    <DropdownButton
      as={ButtonGroup}
      variant="outline-secondary"
      title={<i className="bi bi-filetype-json"></i>}
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

const Header = ({
  downloadJsonHref, disabledExport,
  onSettingsClick, onCalendarClick, onImportKanbanBoardClick
}) => (
  <div className="row bg-secondary-subtle p-2 justify-content-between">
    <div className="col col-md-3 col-lg-2">
      <h3 className="m-0">Kanban Board</h3>
    </div>
    <div className="col-6 col-md-3 col-lg-2 text-end">
      <ButtonGroup>
        <Button
          variant="outline-secondary"
          className="bi bi-arrows-fullscreen"
          onClick={() => {
            const isFullScreen = window.document.fullscreenElement

            isFullScreen ?
              window.document.exitFullscreen() :
              window.document.documentElement.requestFullscreen()
          }}
        />

        <Button
          variant="outline-secondary"
          className="bi bi-calendar2-week"
          onClick={onCalendarClick}
        />

        <ExchangeButton
          downloadJsonHref={downloadJsonHref}
          disabledExport={disabledExport}
          onImportKanbanBoardClick={onImportKanbanBoardClick}
        />

        <Button
          variant="outline-secondary"
          className="bi bi-gear"
          onClick={onSettingsClick}
        />
      </ButtonGroup>
    </div>
  </div>
)

export default Header