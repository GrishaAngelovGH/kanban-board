import { useDraggable } from "@dnd-kit/core"

import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

import users from "users"

const Task = ({ id, columnId, assignedIds, title, description, onEdit, onAssignUser, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { description, columnId }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  const handleDelete = () => {
    onDelete(id, columnId)
  }

  const handleEdit = () => {
    onEdit({ id, title, description }, columnId)
  }

  const handleAssignUser = () => {
    onAssignUser({ id, title, description, assignedIds }, columnId)
  }

  return (
    <div ref={setNodeRef} style={style} className="row bg-white mt-3 rounded shadow p-1">
      <div className="col-9">
        <p className="fw-bold">{title}</p>
      </div>
      <div className="col-3">
        <i {...listeners} {...attributes} className="bi bi-grip-horizontal fs-2"></i>
      </div>
      <p className="text-secondary">{description}</p>

      <div className="mb-3">
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
                <img src={user.image} width={35} className="rounded-circle me-1" alt="assigned-user" />

              </OverlayTrigger>
            )
          })
        }
      </div>

      <div className="d-flex">
        <i role="button" onClick={handleDelete} className="bi bi-trash fs-4 text-danger"></i>
        <i role="button" onClick={handleEdit} className="bi bi-pencil-square fs-4 text-secondary mx-1"></i>
        <i role="button" onClick={handleAssignUser} className="bi bi-person-circle fs-4 text-secondary mx-1"></i>
      </div>
    </div>
  )
}

export default Task