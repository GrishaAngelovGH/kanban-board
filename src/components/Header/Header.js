import FilterMenu from "./DropdownMenus/FilterMenu"
import BoardMenu from "./DropdownMenus/BoardMenu"

const Header = ({ downloadJsonHref, disabledExport, handlers }) => {
  const { onUsersClick, onSettingsClick, onCalendarClick, onImportKanbanBoardClick, onUpdate } = handlers

  return (
    <div className="row bg-secondary-subtle p-2 justify-content-between align-items-center">
      <div className="col-4 col-md-4 col-lg-3">
        <h3 className="m-0">Kanban Board</h3>
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