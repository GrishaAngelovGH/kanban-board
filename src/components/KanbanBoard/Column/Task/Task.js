import { useDraggable } from "@dnd-kit/core"

import Badge from "react-bootstrap/Badge"

import Actions from "components/KanbanBoard/Column/Task/Actions"
import AssignedUsers from "components/KanbanBoard/Column/Task/AssignedUsers"
import RichTextDescription from "components/RichTextDescription"
import WordHighlighter from "components/WordHighlighter"

import boardRepository from "persistent/persistentKanbanBoardRepository"
import userRepository from "persistent/persistentUserRepository"

import "./Task.css"

const priorityStyles = {
  "low": "border border-3 border-warning",
  "medium": "border border-3 border-success",
  "high": "border border-3 border-danger"
}

const Task = ({
  id, columnId, assignedIds, dependencyTasksIds, title, description, priority, isTemplate, isActive,
  isGridView, isSingleRowView, markedAsDone, isLocked, handlers, showToastWithMessage
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { columnId }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  const handleDelete = () => {
    handlers.onDelete(id, columnId)
  }

  const handleEdit = () => {
    handlers.onEdit({ id, title, description, priority, isTemplate }, columnId)
  }

  const handleAssignUser = () => {
    handlers.onAssignUser({ id, title, description, priority, isTemplate, assignedIds }, columnId)
  }

  const handleToggleLock = () => {
    handlers.onToggleLock(id, columnId, !isLocked)
  }

  const handleToggleActiveStatus = () => {
    boardRepository.toggleTaskActiveStatus(id, columnId)
    showToastWithMessage("Task status is successfully changed")
  }

  const handleTaskSwap = ({ currentTarget }) => {
    const swapWithPrev = currentTarget.getAttribute("data-swap-with-prev") === "true"
    boardRepository.swapTask(id, columnId, swapWithPrev)
    showToastWithMessage("Task is successfully swapped")
  }

  const users = userRepository.getUsers()

  const bgClass = markedAsDone ? "bg-success-subtle" : "bg-white"
  const borderClass = priorityStyles[priority]

  return (
    <div ref={setNodeRef} style={style} className={`row m-0 ${bgClass} ${borderClass} mt-3 rounded shadow p-1`}>
      <i className="bi bi-chevron-up text-center rounded move-btn mb-1" data-swap-with-prev={true} onClick={handleTaskSwap}></i>
      {
        isActive && (
          <div className="bg-primary rounded p-2 text-white text-center text-capitalize mb-2">
            Active Task
          </div>
        )
      }

      <div className={`${isGridView || isSingleRowView ? "col-9" : "col-11"}`}>
        <p className="fw-bold text-capitalize">
          <WordHighlighter text={title} />
        </p>
        {isTemplate && (<Badge bg="primary">This task is a template</Badge>)}
      </div>

      {
        !isLocked && (
          <div className={`${isGridView || isSingleRowView ? "col-3" : "col-1"}`}>
            <i {...listeners} {...attributes} className="bi bi-grip-horizontal fs-2"></i>
          </div>
        )
      }

      <div className="text-secondary overflow-auto task-description">
        <RichTextDescription description={description} />
      </div>

      <AssignedUsers
        taskId={id}
        columnId={columnId}
        assignedIds={assignedIds}
        showToastWithMessage={showToastWithMessage}
      />

      <Actions
        ids={{ taskId: id, columnId, assignedIds, dependencyTasksIds }}
        handlers={{ handleToggleActiveStatus, handleDelete, handleEdit, handleAssignUser, handleToggleLock }}
        statuses={{ markedAsDone, isActive, isLocked, isTemplate, hasUsers: users.length > 0 }}
        priority={priority}
      />

      <div className="bi bi-chevron-down text-center rounded move-btn" data-task-swap-with-prev={false} onClick={handleTaskSwap}></div>
    </div>
  )
}

export default Task