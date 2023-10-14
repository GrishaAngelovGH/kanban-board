import Dropdown from "react-bootstrap/Dropdown"

import "./Column.css"

const Column = ({ title, description, onDeleteColumn, onAddTask }) => {
  const handleDeleteAction = () => {
    onDeleteColumn(title)
  }

  const hadleAddTask = () => {
    onAddTask(title)
  }

  return (
    <div className="col-md-5 col-lg-3 bg-secondary-subtle rounded shadow p-3 overflow-auto kanban-column">
      <div className="row">
        <div className="col-9">
          <h3>{title}</h3>
        </div>
        <div className="col-3">
          <Dropdown>
            <Dropdown.Toggle variant="success" className="bi bi-three-dots-vertical" />
            <Dropdown.Menu>
              <Dropdown.Item onClick={hadleAddTask}>
                <i className="bi bi-plus-circle-fill text-primary mx-1"></i>
                Add Task
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDeleteAction}>
                <i className="bi bi-x-circle-fill text-danger mx-1"></i>
                Delete Column
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <p className="text-secondary">{description}</p>
    </div>
  )
}

export default Column