import { useDraggable } from "@dnd-kit/core"
import { Button } from "react-bootstrap"

const Task = ({ title, description, column, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: { description, column }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  const handleDelete = () => {
    onDelete(title, column)
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

      <Button size="sm" variant="danger" onClick={handleDelete} className="bi bi-trash fs-5" />
    </div>
  )
}

export default Task