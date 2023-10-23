import { useDraggable } from "@dnd-kit/core"

const Task = ({ id, columnId, title, description, onEdit, onAssignUser, onDelete }) => {
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

  return (
    <div ref={setNodeRef} style={style} className="row bg-white mt-3 rounded shadow p-1">
      <div className="col-9">
        <p className="fw-bold">{title}</p>
      </div>
      <div className="col-3">
        <i {...listeners} {...attributes} className="bi bi-grip-horizontal fs-2"></i>
      </div>
      <p className="text-secondary">{description}</p>
      <div className="d-flex">
        <i role="button" onClick={handleDelete} className="bi bi-trash fs-4 text-danger"></i>
        <i role="button" onClick={handleEdit} className="bi bi-pencil-square fs-4 text-secondary mx-1"></i>
        <i role="button" onClick={onAssignUser} className="bi bi-person-circle fs-4 text-secondary mx-1"></i>
      </div>
    </div>
  )
}

export default Task