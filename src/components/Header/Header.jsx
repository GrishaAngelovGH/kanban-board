import FilterMenu from "./DropdownMenus/FilterMenu"
import BoardMenu from "./DropdownMenus/BoardMenu"

import TaskProgress from "components/TaskProgress"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const Header = ({ downloadJsonHref, disabledExport, handlers }) => {
  const { onUsersClick, onSettingsClick, onCalendarClick, onImportKanbanBoardClick, onUpdate } = handlers

  const columns = boardRepository.getColumns()

  return (
    <div className="row bg-secondary-subtle p-2 justify-content-between align-items-center">
      <div className="col-4 col-md-4 col-lg-2">
        <h3 className="m-0 text-center">Kanban Board</h3>
      </div>

      <div className="col-4 col-md">
        <TaskProgress
          className="m-0 p-md-2 p-lg-1 bg-transparent text-secondary"
          columns={columns}
        />
      </div>

      <div className="col-4 col-md-2 col-lg-1">
        <div className="d-flex justify-content-evenly">
          <FilterMenu onUpdate={onUpdate} />

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