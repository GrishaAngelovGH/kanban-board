import RichTextDescription from "components/RichTextDescription"
import Button from "react-bootstrap/Button"

import history from "persistent/history"

const Task = ({ id, title, description, priority, column, showToastWithMessage }) => {
  const handleRestore = () => {
    history.restoreTask(id, column.id)
    showToastWithMessage("The task is successfully restored")
  }

  const handleDelete = () => {
    history.removeTask(id, column.id)
    showToastWithMessage("The task is successfully removed")
  }

  return (
    <div className="mt-3 border border-3 shadow rounded p-3 bg-light">
      <h3>{title}</h3>

      <RichTextDescription description={description} className="mb-3" />

      {
        priority.length > 0 && (
          <p className="text-capitalize">Priority: {priority}</p>
        )
      }

      <div className="task-actions">
        <Button
          variant="primary"
          size="sm"
          onClick={handleRestore}
        >
          Restore
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default Task