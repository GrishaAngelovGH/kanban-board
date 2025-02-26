import { Link } from "react-router-dom"

import Button from "react-bootstrap/Button"

import Tooltip from "components/Tooltip"

const bookmarkStyles = {
  "low": "text-warning",
  "medium": "text-success",
  "high": "text-danger"
}

const Actions = ({
  ids: { taskId, columnId, assignedIds, dependencyTasksIds },
  handlers: { handleToggleActiveStatus, handleDelete, handleEdit, handleAssignUser, handleToggleLock },
  statuses: { markedAsDone, isActive, isLocked, isTemplate, hasUsers },
  priority
}) => {
  return (
    <>
      {
        !markedAsDone && assignedIds.length > 0 && !dependencyTasksIds.length && (
          <Button
            size="sm"
            variant="outline-primary"
            disabled={!assignedIds.length}
            className="mb-1"
            onClick={handleToggleActiveStatus}
          >
            {isActive ? "Deactivate" : "Activate"}
          </Button>
        )
      }

      {
        !markedAsDone && (
          <Link
            to={`/task/${columnId}/${taskId}/dependencies`}
            className="btn btn-outline-secondary btn-sm mb-3"
          >
            Manage Dependencies {dependencyTasksIds.length > 0 && `(${dependencyTasksIds.length})`}
          </Link>
        )
      }

      <div className="d-flex justify-content-between">
        <div>
          {!isLocked && <i role="button" onClick={handleDelete} className="bi bi-trash fs-4 text-danger"></i>}
          <i role="button" onClick={handleEdit} className="bi bi-pencil-square fs-4 text-secondary mx-1"></i>
          {!isTemplate && hasUsers && <i role="button" onClick={handleAssignUser} className="bi bi-person-circle fs-4 text-secondary mx-1"></i>}
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
    </>
  )
}

export default Actions