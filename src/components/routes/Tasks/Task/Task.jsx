import RichTextDescription from "components/RichTextDescription"
import Collaborators from "components/routes/Tasks/Collaborators"
import MoveToColumnDropdownButton from "components/routes/Tasks/MoveToColumnDropdownButton"
import Button from "react-bootstrap/Button"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const Task = ({
  id: taskId, userId, title, description, priority, assignedIds,
  isLocked, column, setActiveKey, showToastWithMessage
}) => {
  const handleUnassignUser = () => {
    boardRepository.removeAssignedUserFromTask(taskId, column.id, userId)
    setActiveKey("")
    showToastWithMessage(`The user is successfully unassigned from "${title}" task`)
  }

  const handleUnassignCollaborators = () => {
    assignedIds.forEach(id => {
      id !== userId && boardRepository.removeAssignedUserFromTask(taskId, column.id, id)
    })

    setActiveKey("")
    showToastWithMessage(`The remaining collaborators have been successfully unassigned from task "${title}"`)
  }

  const dependencyTasks = boardRepository.getDependencyTasks(taskId, column.id)

  return (
    <div className="mt-3 border border-3 shadow rounded p-3 bg-light">
      <h3>{title} {isLocked && <i className="bi bi-lock"></i>}</h3>

      <RichTextDescription description={description} className="mb-3" />

      {
        priority.length > 0 && (
          <p className="text-capitalize">Priority: {priority}</p>
        )
      }

      {
        dependencyTasks.length > 0 && (
          <div className="fw-bold">Dependency tasks ({dependencyTasks.length})</div>
        )
      }

      {
        dependencyTasks.map(v => (
          <div key={v.id} className="m-2 bg-secondary-subtle rounded p-1 ps-3">
            {v.title}
          </div>
        ))
      }

      <Collaborators ids={assignedIds} userId={userId} />

      <div className="task-actions">
        <MoveToColumnDropdownButton
          column={column}
          task={{ taskId, isLocked }}
          showToastWithMessage={showToastWithMessage}
          setActiveKey={setActiveKey}
        />

        <Button
          variant="danger"
          size="sm"
          onClick={handleUnassignUser}
        >
          Unassign Me
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={handleUnassignCollaborators}
        >
          Leave only me
        </Button>
      </div>
    </div>
  )
}

export default Task