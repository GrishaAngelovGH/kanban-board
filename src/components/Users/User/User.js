
import boardRepository from "persistent/persistentKanbanBoardRepository"
import userRepository from "persistent/persistentUserRepository"

const User = ({ id, name, image, onUpdate }) => {
  const handleRemove = () => {
    userRepository.deleteUser(id)
    boardRepository.removeAssignedUserFromTasks(id)
    onUpdate()
  }

  return (
    <div className="row align-items-center mt-2">
      <div className="col-2">
        <img src={image} width={50} className="rounded-circle" alt="assigned-user" />
      </div>
      <div className="col-8">
        <p className="m-0 fw-bold">{name}</p>
      </div>
      <div className="col-2">
        <button className="btn btn-danger bi bi-trash" onClick={handleRemove} />
      </div>
    </div>
  )
}

export default User