import { Link } from "react-router-dom"

import userRepository from "persistent/persistentUserRepository"

import useBackgroundImage from "hooks/useBackgroundImage"

const Tasks = ({ userId }) => {
  const backgroundImage = useBackgroundImage()
  const user = userRepository.findUserById(userId)

  return (
    <div className="row g-0 vh-100" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none", backgroundSize: "cover" }}>
      <div className="col-12">
        <div className="row g-0 bg-light p-2 shadow">
          <div className="col-1">
            <Link to="/" className="btn btn-light bi bi-arrow-left border"></Link>
          </div>
          <div className="col-11">
            <h3 className="m-0 text-center">Tasks assigned to {user.name}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks