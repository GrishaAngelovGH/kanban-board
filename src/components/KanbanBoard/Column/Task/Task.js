import { useDraggable } from "@dnd-kit/core"

import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

import Avatar from "components/Avatar"

import parse from "html-react-parser"

import usersRepository from "persistent/persistentUserRepository"

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
  id, columnId, assignedIds, title, description, priority,
  isGridView, isSingleRowView, markedAsDone, isLocked,
  onEdit, onAssignUser, onToggleLock, onDelete
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { columnId }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  const handleDelete = () => {
    onDelete(id, columnId)
  }

  const handleEdit = () => {
    onEdit({ id, title, description, priority }, columnId)
  }

  const handleAssignUser = () => {
    onAssignUser({ id, title, description, priority, assignedIds }, columnId)
  }

  const handleToggleLock = () => {
    onToggleLock(id, columnId, !isLocked)
  }

  const users = usersRepository.getUsers()

  const bgClass = markedAsDone ? "bg-success-subtle" : "bg-white"
  const borderClass = priorityStyles[priority]

  return (
    <div ref={setNodeRef} style={style} className={`row m-0 ${bgClass} ${borderClass} mt-3 rounded shadow p-1`}>
      <div className={`${isGridView || isSingleRowView ? "col-9" : "col-11"}`}>
        <p className="fw-bold text-capitalize">{title}</p>
      </div>

      {
        !isLocked && (
          <div className={`${isGridView || isSingleRowView ? "col-3" : "col-1"}`}>
            <i {...listeners} {...attributes} className="bi bi-grip-horizontal fs-2"></i>
          </div>
        )
      }

      <div className="text-secondary overflow-auto task-description">
        {parse(description)}
      </div>

      <div className="mb-3 d-flex align-items-center flex-wrap">
        {
          assignedIds.map(v => {
            const user = users.find(u => u.id === v)

            const renderTooltip = (props) => (
              <Tooltip {...props}>
                {user.name}
              </Tooltip>
            )

            return (
              <OverlayTrigger
                key={v}
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <div>
                  <Avatar user={user} size={35} />
                </div>
              </OverlayTrigger>
            )
          })
        }
      </div>

      <div className="d-flex justify-content-between">
        <div>
          {!isLocked && <i role="button" onClick={handleDelete} className="bi bi-trash fs-4 text-danger"></i>}
          <i role="button" onClick={handleEdit} className="bi bi-pencil-square fs-4 text-secondary mx-1"></i>
          {users.length > 0 && <i role="button" onClick={handleAssignUser} className="bi bi-person-circle fs-4 text-secondary mx-1"></i>}
          <i role="button" onClick={handleToggleLock} className={`bi bi-${isLocked ? "lock-fill" : "unlock-fill"} fs-4 text-secondary mx-1`}></i>
        </div>
        {
          priority.length > 0 && (
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => (
                <Tooltip {...props} className="text-capitalize">
                  {priority} Priority
                </Tooltip>
              )}
            >
              <i className={`bi bi-bookmark-fill fs-4 ${bookmarkStyles[priority]}`}></i>
            </OverlayTrigger>
          )
        }
      </div>
    </div>
  )
}

export default Task