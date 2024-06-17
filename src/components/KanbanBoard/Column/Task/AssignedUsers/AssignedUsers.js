import { Link } from "react-router-dom"

import Button from "react-bootstrap/Button"

import Avatar from "components/Avatar"
import Tooltip from "components/Tooltip"

import boardRepository from "persistent/persistentKanbanBoardRepository"
import userRepository from "persistent/persistentUserRepository"

const AssignedUsers = ({ taskId, columnId, assignedIds, showToastWithMessage }) => {
  const users = userRepository.getUsers()

  return (
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
                    boardRepository.removeAssignedUserFromTask(taskId, columnId, assignedId)
                    boardRepository.toggleTaskActiveStatus(taskId, columnId, false)
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
  )
}

export default AssignedUsers