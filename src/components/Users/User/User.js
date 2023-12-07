import { forwardRef } from "react"

import boardRepository from "persistent/persistentKanbanBoardRepository"
import userRepository from "persistent/persistentUserRepository"

import Avatar from "components/Avatar"

const User = forwardRef(function User({ id, name, image, onUpdate }, ref) {
  const handleRemove = () => {
    userRepository.deleteUser(id)
    boardRepository.removeAssignedUserFromTasks(id)
    onUpdate()
  }

  return (
    <div className="row align-items-center m-0 mt-2" ref={ref}>
      <div className="col-2">
        <Avatar user={{ image, name }} />
      </div>
      <div className="col-8">
        <p className="m-0 fw-bold">{name}</p>
      </div>
      <div className="col-2">
        <button className="btn btn-danger bi bi-trash" onClick={handleRemove} />
      </div>
    </div>
  )
})

export default User