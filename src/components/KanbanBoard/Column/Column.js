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
  const isGridView = settingsRepository.isGridView()
  const hasNoBackground = settingsRepository.hasNoBackground()
  const hasSolidColumnStyle = settingsRepository.hasSolidColumnStyle()
  const layoutClasses = isGridView ? gridViewClasses : singleColumnViewClasses
  const columnStyle = hasSolidColumnStyle ? "solid-column" : "blurred-column"

  // Generally, when "solid" column is chosen, the text should be dark.
  // When the column is set to "blurred" and the background is set to "No Background", the text should be dark.
  // When the column is set to "blurred" and the background is different than "No Background", the text should be light.

  const titleClass = hasSolidColumnStyle || hasNoBackground ? "text-dark" : "text-white"
  const descriptionClass = hasSolidColumnStyle || hasNoBackground ? "text-secondary" : "text-white"
  const checkButtonClass = hasSolidColumnStyle ? "secondary-subtle" : "light"
  const taskLengthButtonClass = hasSolidColumnStyle ? "secondary" : "light"

  return (
    <div
      ref={setNodeRef}
      className={`${layoutClasses} ${columnStyle} rounded p-4 overflow-auto kanban-column`}
      style={{ borderStyle: isOver ? "dashed" : "none" }}
    >
      <div className="row">
        <div className={`${isGridView ? "col-7 col-lg-8" : "col-10"}`}>
          <h3 className={`${titleClass} text-break`}>{title}</h3>
        </div>
        <div className={`${isGridView ? "col-5 col-lg-4" : "col-2"}`}>
          <ButtonGroup size="sm">
            {markedAsDone && <Button variant={checkButtonClass} className="bi bi-check-circle-fill text-success" disabled />}

            <Button variant={taskLengthButtonClass} disabled>{tasks.length}</Button>

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

      <p className={descriptionClass}>{description}</p>

      <div className="overflow-hidden">
        {
          tasks.map(v => (
            <Task
              key={v.id}
              id={v.id}
              columnId={id}
              assignedIds={v.assignedIds}
              title={v.title}
              description={v.description}
              priority={v.priority}
              isGridView={isGridView}
              markedAsDone={markedAsDone}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onAssignUser={onAssignUser}
            />
          ))
        }
      </div>
    </div>
  )
}
export default Column