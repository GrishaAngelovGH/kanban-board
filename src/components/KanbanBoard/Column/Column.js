import "./Column.css"

const Column = ({ title, description }) => (
  <div className="col-md-5 col-lg-3 bg-secondary-subtle rounded shadow p-3 overflow-auto kanban-column">
    <h3>{title}</h3>
    <p className="text-secondary">{description}</p>
  </div>
)

export default Column