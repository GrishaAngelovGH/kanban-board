import { Fragment } from "react"

import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

import BoardMenu from "./DropdownMenus/BoardMenu"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const Header = ({ downloadJsonHref, disabledExport, handlers }) => {
  const { onUsersClick, onSettingsClick, onCalendarClick, onImportKanbanBoardClick, onUpdate } = handlers

  const filters = [
    {
      category: "Filter by priority",
      items: ["All", "Low", "Medium", "High"],
      onClick: ({ target: { innerText } }) => {
        boardRepository.applyPriorityFilter(innerText)
        onUpdate()
      }
    }
  ]

  return (
    <div className="row bg-secondary-subtle p-2 justify-content-between align-items-center">
      <div className="col-4 col-md-4 col-lg-3">
        <h3 className="m-0">Kanban Board</h3>
      </div>

      <div className="col-4 col-md-2 col-lg-1">
        <div className="d-flex justify-content-evenly">
          <DropdownButton as={ButtonGroup} size="sm" variant="light" title={<i className="bi bi-filter"></i>}>
            {
              filters.map((v, i) => (
                <Fragment key={i}>
                  <Dropdown.ItemText className="bg-secondary-subtle text-secondary border text-center">{v.category}</Dropdown.ItemText>
                  {
                    v.items.map((item, j) => (
                      <Dropdown.Item key={j} onClick={v.onClick} >
                        {item}
                      </Dropdown.Item>
                    ))
                  }
                </Fragment>
              ))
            }
          </DropdownButton>

          <BoardMenu
            downloadJsonHref={downloadJsonHref}
            disabledExport={disabledExport}
            onUsersClick={onUsersClick}
            onSettingsClick={onSettingsClick}
            onCalendarClick={onCalendarClick}
            onImportKanbanBoardClick={onImportKanbanBoardClick}
            onUpdate={onUpdate}
          />
        </div>
      </div>
    </div>
  )
}

export default Header