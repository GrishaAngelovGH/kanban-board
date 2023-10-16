import { useDroppable } from "@dnd-kit/core"

import Dropdown from "react-bootstrap/Dropdown"

import Task from "./Task"

import "./Column.css"

const Column = ({ title, description, tasks, onDeleteColumn, onAddTask, onDeleteTask, onDeleteAllTasks }) => {
  const { isOver, setNodeRef } = useDroppable({ id: title })

  const handleDeleteAction = () => {
    onDeleteColumn(title)
  }

  const hadleAddTask = () => {
    onAddTask(title)
  }

  const hadleDeleteAllTasks = () => {
    onDeleteAllTasks(title)
  }

  return (
    <div ref={setNodeRef} className="col-md-5 col-lg-3 bg-secondary-subtle rounded shadow p-4 overflow-auto kanban-column" style={{ borderStyle: isOver ? "dashed" : "none" }}>
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
              <Dropdown.Item onClick={hadleDeleteAllTasks}>
                <i className="bi bi-x-circle-fill text-danger mx-1"></i>
                Delete All Tasks
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <p className="text-secondary">{description}</p>

      {
        tasks.map((v, i) => (
          <Task
            key={i}
            title={v.title}
            description={v.description}
            column={title}
            onDelete={onDeleteTask}
          />
        ))
      }
    </div>
  )
}
export default Column