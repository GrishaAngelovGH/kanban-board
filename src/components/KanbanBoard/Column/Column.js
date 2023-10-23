import { useDroppable } from "@dnd-kit/core"

import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

import Task from "./Task"

import "./Column.css"

const Column = ({ id, title, description, tasks, onDeleteColumn, onAddTask, onEditTask, onDeleteTask, onDeleteAllTasks, onAssignUser }) => {
  const { isOver, setNodeRef } = useDroppable({ id })

  const handleDeleteAction = () => {
    onDeleteColumn(id)
  }

  const hadleAddTask = () => {
    onAddTask(id)
  }

  const hadleDeleteAllTasks = () => {
    onDeleteAllTasks(id)
  }

  return (
    <div
      ref={setNodeRef}
      className="col-md-5 col-lg-3 bg-secondary-subtle rounded shadow p-4 overflow-auto kanban-column"
      style={{ borderStyle: isOver ? "dashed" : "none", cursor: isOver ? "pointer" : "auto" }}
    >
      <div className="row">
        <div className="col-9">
          <h3>{title}</h3>
        </div>
        <div className="col-3">
          <ButtonGroup size="sm">
            <Button variant="secondary" disabled>{tasks.length}</Button>

            <DropdownButton as={ButtonGroup} size="sm" variant="light" title={<i className="bi bi-three-dots-vertical"></i>}>
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
            </DropdownButton>
          </ButtonGroup>
        </div>
      </div>

      <p className="text-secondary">{description}</p>

      {
        tasks.map(v => (
          <Task
            key={v.id}
            id={v.id}
            columnId={id}
            title={v.title}
            description={v.description}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onAssignUser={onAssignUser}
          />
        ))
      }
    </div>
  )
}
export default Column