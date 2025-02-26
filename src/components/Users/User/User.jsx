import { forwardRef } from "react"

import { Link } from "react-router-dom"

import Button from "react-bootstrap/Button"

import boardRepository from "persistent/persistentKanbanBoardRepository"
import userRepository from "persistent/persistentUserRepository"

import Avatar from "components/Avatar"
import Tooltip from "components/Tooltip"

const User = forwardRef(function User({ id, name, image, onUpdate }, ref) {
  const handleRemove = () => {
    userRepository.deleteUser(id)
    boardRepository.removeAssignedUserFromTasks(id)
    boardRepository.removeAssignedUserFromColumns(id)
    onUpdate()
  }

  return (
    <div className="row align-items-center m-0 mt-2" ref={ref}>
      <div className="col-2">
        <Avatar user={{ image, name }} />
      </div>
      <div className="col-6">
        <p className="m-0 fw-bold">{name}</p>
      </div>
      <div className="col-4">
        <Tooltip label="View assigned tasks">
          <Link to={`/tasks/${id}`} className="btn btn-success bi bi-clipboard-check me-2"></Link>
        </Tooltip>

        <Tooltip label="Delete User">
          <Button variant="danger" className="bi bi-trash" onClick={handleRemove} />
        </Tooltip>
      </div>
    </div>
  )
})

export default User