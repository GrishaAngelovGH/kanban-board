import { useState } from "react"

import { useDroppable } from "@dnd-kit/core"

import Header from "./Header"
import Task from "./Task"
import TaskLimitInput from "./TaskLimitInput"

import EditableText from "components/EditableText"
import ActiveTasksProgress from "components/KanbanBoard/ActiveTasksProgress"

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

  const descriptionClass = hasSolidColumnStyle || hasNoBackground ? "text-secondary" : "text-white"

  return (
    <div
      ref={setNodeRef}
      className={`${layoutClasses} ${columnStyle} rounded p-4 overflow-auto kanban-column`}
      style={{ borderStyle: isOver ? "dashed" : "none" }}
    >
      <Header
        id={id}
        title={title}
        limit={limit}
        tasks={tasks}
        statuses={{
          markedAsDone,
          isGridView,
          isSingleRowView,
          hasNoBackground,
          hasSolidColumnStyle
        }}
        handlers={{
          ...handlers,
          setShowLimit,
          handleUpdate
        }}
      />

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