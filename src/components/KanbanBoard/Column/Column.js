import { useState } from "react"

import { useDroppable } from "@dnd-kit/core"

import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

import Task from "./Task"
import TaskLimitInput from "./TaskLimitInput"

import EditableText from "components/EditableText"
import ActiveTasksProgress from "components/KanbanBoard/ActiveTasksProgress"
import NavigationButtons from "components/KanbanBoard/NavigationButtons"

import settingsRepository from "persistent/persistentSettingsRepository"

import "./Column.css"

const Column = ({
  id, title, description, tasks, limit, markedAsDone,
  columnHandlers: handlers, showToastWithMessage
}) => {
  const [currentLimit, setCurrentLimit] = useState(limit)
  const [showLimit, setShowLimit] = useState(false)

  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled: limit > 0 && limit === tasks.length
  })

  const handleAddTask = () => {
    handlers.onAddTask(id)
  }

  const handleMarkAsDone = () => {
    handlers.onMarkColumnAsDone(id)
  }

  const handleDeleteAction = () => {
    handlers.onDeleteColumn(id)
  }

  const handleDeleteAllTasks = () => {
    handlers.onDeleteAllTasks(id)
  }

  const handleShowLimit = () => {
    setShowLimit(true)
  }

  const handleCancelLimit = () => {
    setCurrentLimit(limit)
    setShowLimit(false)
  }

  const handleChangeLimit = ({ target: { valueAsNumber } }) => {
    setCurrentLimit(valueAsNumber)
  }

  const handleConfirmLimit = () => {
    setShowLimit(false)
    handlers.onSetColumnLimit(id, currentLimit)
  }

  const handleUpdate = (value, isTextArea) => {
    handlers.onColumnUpdate(id, value, isTextArea)
  }

  const handleAutoAssignUsers = () => {
    handlers.onAutoAssignUser(id)
  }

  const handleSwapToLeft = () => {
    handlers.onSwapColumn(id, true)
  }

  const handleSwapToRight = () => {
    handlers.onSwapColumn(id, false)
  }

  const gridViewClasses = "col-md-5 col-lg-3"
  const singleColumnViewClasses = "col-md-12 col-lg-7"
  const isGridView = settingsRepository.isGridView()
  const isSingleRowView = settingsRepository.isSingleRowView()
  const hasNoBackground = settingsRepository.hasNoBackground()
  const hasSolidColumnStyle = settingsRepository.hasSolidColumnStyle()
  const layoutClasses = isGridView || isSingleRowView ? gridViewClasses : singleColumnViewClasses
  const columnStyle = hasSolidColumnStyle ? "solid-column" : "blurred-column"

  // Generally, when "solid" column is chosen, the text should be dark.
  // When the column is set to "blurred" and the background is set to "No Background", the text should be dark.
  // When the column is set to "blurred" and the background is different than "No Background", the text should be light.

  const titleClass = hasSolidColumnStyle || hasNoBackground ? "text-dark" : "text-white"
  const descriptionClass = hasSolidColumnStyle || hasNoBackground ? "text-secondary" : "text-white"
  const checkButtonClass = hasSolidColumnStyle ? "secondary-subtle" : "light"
  const taskLengthButtonClass = hasSolidColumnStyle ? "secondary" : "light"

  const menuItems = [
    { label: "Add Task", icon: "bi bi-plus-circle-fill text-primary mx-1", onClick: handleAddTask },
    { label: markedAsDone ? "Unmark as Done" : "Mark as Done", icon: "bi bi-check-square-fill text-success mx-1", onClick: handleMarkAsDone },
    { label: "Delete Column", icon: "bi bi-x-circle-fill text-danger mx-1", onClick: handleDeleteAction },
    { label: "Delete All Tasks", icon: "bi bi-x-circle-fill text-danger mx-1", onClick: handleDeleteAllTasks },
    { label: "Set Task Limit", icon: "bi bi-exclamation-circle-fill text-warning mx-1", onClick: handleShowLimit },
    { label: "Auto Assign Users", icon: "bi bi-star-fill text-warning mx-1", onClick: handleAutoAssignUsers }
  ]

  return (
    <div
      ref={setNodeRef}
      className={`${layoutClasses} ${columnStyle} rounded p-4 overflow-auto kanban-column`}
      style={{ borderStyle: isOver ? "dashed" : "none" }}
    >
      <div className="row">
        <div className={`${isGridView || isSingleRowView ? "col-7 col-lg-8" : "col-10"}`}>
          <NavigationButtons
            size="sm"
            className="mb-2"
            onLeftClick={handleSwapToLeft}
            onRightClick={handleSwapToRight}
          />

          <EditableText onBlur={handleUpdate}>
            <h3 className={`${titleClass} text-break text-capitalize`}>{title}</h3>
          </EditableText>
          <h3 className={titleClass}>{limit > 0 && `(${tasks.length} / ${limit})`}</h3>
        </div>
        <div className={`${isGridView || isSingleRowView ? "col-5 col-lg-4" : "col-2"}`}>
          <ButtonGroup size="sm">
            {markedAsDone && <Button variant={checkButtonClass} className="bi bi-check-circle-fill text-success" disabled />}

            <Button variant={taskLengthButtonClass} disabled>{tasks.length}</Button>

            <DropdownButton as={ButtonGroup} size="sm" variant="light" title={<i className="bi bi-three-dots-vertical"></i>}>
              {
                menuItems.map((v, i) => (
                  <Dropdown.Item key={i} onClick={v.onClick}>
                    <i className={v.icon}></i>
                    {v.label}
                  </Dropdown.Item>
                ))
              }
            </DropdownButton>
          </ButtonGroup>
        </div>
      </div>

      <EditableText isTextArea onBlur={handleUpdate}>
        <p className={`${descriptionClass} column-description`}>{description}</p>
      </EditableText>

      {!markedAsDone && <ActiveTasksProgress tasks={tasks} />}

      {
        showLimit && (
          <TaskLimitInput
            currentLimit={currentLimit}
            disabledConfirm={currentLimit < tasks.length && currentLimit > 0}
            onChange={handleChangeLimit}
            onCancel={handleCancelLimit}
            onConfirm={handleConfirmLimit}
          />
        )
      }

      <div className="overflow-hidden">
        {
          tasks.map(v => (
            <Task
              key={v.id}
              {...v}
              columnId={id}
              isGridView={isGridView}
              isSingleRowView={isSingleRowView}
              markedAsDone={markedAsDone}
              handlers={{
                onEdit: handlers.onEditTask,
                onDelete: handlers.onDeleteTask,
                onAssignUser: handlers.onAssignUser,
                onToggleLock: handlers.onToggleTaskLock
              }}
              showToastWithMessage={showToastWithMessage}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Column