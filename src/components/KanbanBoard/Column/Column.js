import { useDroppable } from "@dnd-kit/core"

import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

import Task from "./Task"

import settingsRepository from "persistent/persistentSettingsRepository"

import "./Column.css"

const Column = ({
  id, title, description, tasks, markedAsDone,
  onDeleteColumn, onAddTask, onEditTask, onDeleteTask,
  onDeleteAllTasks, onAssignUser, onMarkColumnAsDone
}) => {
  const { isOver, setNodeRef } = useDroppable({ id })

  const handleDeleteAction = () => {
    onDeleteColumn(id)
  }

  const handleAddTask = () => {
    onAddTask(id)
  }

  const handleMarkAsDone = () => {
    onMarkColumnAsDone(id)
  }

  const handleDeleteAllTasks = () => {
    onDeleteAllTasks(id)
  }

  const gridViewClasses = "col-md-5 col-lg-3"
  const singleColumnViewClasses = "col-md-12 col-lg-7"
  const isGridView = settingsRepository.getLayout() === "Grid View"
  const layoutClasses = isGridView ? gridViewClasses : singleColumnViewClasses

  return (
    <div
      ref={setNodeRef}
      className={`${layoutClasses} bg-secondary-subtle rounded shadow p-4 overflow-auto kanban-column`}
      style={{ borderStyle: isOver ? "dashed" : "none", cursor: isOver ? "pointer" : "auto" }}
    >
      <div className="row">
        <div className={`${isGridView ? "col-7 col-lg-8" : "col-10"}`}>
          <h3>{title}</h3>
        </div>
        <div className={`${isGridView ? "col-5 col-lg-4" : "col-2"}`}>
          <ButtonGroup size="sm">
            {markedAsDone && <Button variant="secondary-subtle" className="bi bi-check-circle-fill text-success" disabled />}

            <Button variant="secondary" disabled>{tasks.length}</Button>

            <DropdownButton as={ButtonGroup} size="sm" variant="light" title={<i className="bi bi-three-dots-vertical"></i>}>
              <Dropdown.Item onClick={handleAddTask}>
                <i className="bi bi-plus-circle-fill text-primary mx-1"></i>
                Add Task
              </Dropdown.Item>
              <Dropdown.Item onClick={handleMarkAsDone}>
                <i className="bi bi-check-square-fill text-success mx-1"></i>
                {markedAsDone ? "Unmark as Done" : "Mark as Done"}
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDeleteAction}>
                <i className="bi bi-x-circle-fill text-danger mx-1"></i>
                Delete Column
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDeleteAllTasks}>
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
            assignedIds={v.assignedIds}
            title={v.title}
            description={v.description}
            isGridView={isGridView}
            markedAsDone={markedAsDone}
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