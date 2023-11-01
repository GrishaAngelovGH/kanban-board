
const Header = ({ onSettingsClick, onCalendarClick }) => (
  <div className="row bg-secondary-subtle p-2 justify-content-between align-items-center">
    <div className="col col-md-3 col-lg-2">
      <h3 className="m-0">Kanban Board</h3>
    </div>
    <div className="col-3 text-end">
      <i role="button" className="bi bi-calendar2-week text-secondary fs-4 me-2" onClick={onCalendarClick}></i>
      <i role="button" className="bi bi-gear text-secondary fs-4" onClick={onSettingsClick}></i>
    </div>
  </div>
)

export default Header