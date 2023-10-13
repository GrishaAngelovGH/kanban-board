import Dropdown from "react-bootstrap/Dropdown"

import "./Column.css"

const Column = ({ title, description, onDelete }) => {
  const handleDeleteAction = () => {
    onDelete(title)
  }

  return (
    <div className="col-md-5 col-lg-3 bg-secondary-subtle rounded shadow p-3 overflow-auto kanban-column">

      <div className="row">
        <div className="col-md-9">
          <h3>{title}</h3>
        </div>
        <div className="col-md-3">
          <Dropdown>
            <Dropdown.Toggle variant="success" className="bi bi-three-dots-vertical" />
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleDeleteAction}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <p className="text-secondary">{description}</p>
    </div>
  )
}

export default Column