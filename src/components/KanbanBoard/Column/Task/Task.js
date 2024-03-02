import { useDraggable } from "@dnd-kit/core"

import { Link } from "react-router-dom"

import Badge from "react-bootstrap/Badge"
import Button from "react-bootstrap/Button"

import Avatar from "components/Avatar"
import RichTextDescription from "components/RichTextDescription"
import Tooltip from "components/Tooltip"
import WordHighlighter from "components/WordHighlighter"

import boardRepository from "persistent/persistentKanbanBoardRepository"
import userRepository from "persistent/persistentUserRepository"

import "./Task.css"

const priorityStyles = {
  "low": "border border-3 border-warning",
  "medium": "border border-3 border-success",
  "high": "border border-3 border-danger"
}

const bookmarkStyles = {
  "low": "text-warning",
  "medium": "text-success",
  "high": "text-danger"
}

const Task = ({
  id, columnId, assignedIds, title, description, priority, isTemplate, isActive,
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

  const users = userRepository.getUsers()

  const bgClass = markedAsDone ? "bg-success-subtle" : "bg-white"
  const borderClass = priorityStyles[priority]

  return (
    <div ref={setNodeRef} style={style} className={`row m-0 ${bgClass} ${borderClass} mt-3 rounded shadow p-1`}>
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

      <div className="mb-3 d-flex align-items-center flex-wrap">
        {
          assignedIds.map(v => {
            const user = users.find(u => u.id === v)

            return (
              <Tooltip key={v} label={user.name}>
                <Link to={`/tasks/${user.id}`} className="text-decoration-none">
                  <Avatar user={user} size={35} />
                </Link>
              </Tooltip>
            )
          })
        }
        {
          assignedIds.length > 0 && (
            <>
              <Tooltip label="Click on a user to see their assigned tasks">
                <i className="m-1 bi bi-info fs-3 text-primary border border-3 border-primary rounded-circle d-flex bg-light"></i>
              </Tooltip>
              <Tooltip label="Remove all assignments">
                <Button
                  variant="outline-danger"
                  className="rounded-circle bi bi-x d-flex justify-content-center align-items-center"
                  style={{ width: 35, height: 35 }}
                  onClick={() => {
                    assignedIds.forEach(assignedId => {
                      boardRepository.removeAssignedUserFromTask(id, columnId, assignedId)
                    })
                    showToastWithMessage("All assigned users were successfully removed")
                  }}
                >
                </Button>
              </Tooltip>
            </>
          )
        }
      </div>

      {
        !markedAsDone && (
          <Button
            size="sm"
            variant="outline-primary"
            disabled={!assignedIds.length}
            className="mb-3"
            onClick={handleToggleActiveStatus}
          >
            {isActive ? "Deactivate" : "Activate"}
          </Button>
        )
      }

      <div className="d-flex justify-content-between">
        <div>
          {!isLocked && <i role="button" onClick={handleDelete} className="bi bi-trash fs-4 text-danger"></i>}
          <i role="button" onClick={handleEdit} className="bi bi-pencil-square fs-4 text-secondary mx-1"></i>
          {!isTemplate && users.length > 0 && <i role="button" onClick={handleAssignUser} className="bi bi-person-circle fs-4 text-secondary mx-1"></i>}
          <i role="button" onClick={handleToggleLock} className={`bi bi-${isLocked ? "lock-fill" : "unlock-fill"} fs-4 text-secondary mx-1`}></i>
        </div>
        {
          priority.length > 0 && (
            <Tooltip label={`${priority} Priority`} className="text-capitalize">
              <i className={`bi bi-bookmark-fill fs-4 ${bookmarkStyles[priority]}`}></i>
            </Tooltip>
          )
        }
      </div>
    </div>
  )
}

export default Task