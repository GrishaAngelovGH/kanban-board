import RichTextDescription from "components/RichTextDescription"
import Button from "react-bootstrap/Button"

import history from "persistent/history"

const Task = ({ id, title, description, priority, column, showToastWithMessage }) => {
  const handleRestore = () => {
    history.restoreTask(id, column.id)
    showToastWithMessage("The task is successfully restored")
  }

  const handleDelete = () => {
    history.deleteTask(id, column.id)
    showToastWithMessage("The task is successfully deleted")
  }

  const buttons = [
    {
      variant: "primary",
      size: "sm",
      label: "Restore",
      onClick: handleRestore
    },
    {
      variant: "danger",
      size: "sm",
      label: "Delete",
      onClick: handleDelete
    }
  ]

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
        {
          buttons.map((v, i) => (
            <Button
              key={i}
              variant={v.variant}
              size={v.size}
              onClick={v.onClick}
            >
              {v.label}
            </Button>
          ))
        }
      </div>
    </div>
  )
}

export default Task