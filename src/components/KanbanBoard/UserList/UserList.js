import { useState } from "react"

import ListGroup from "react-bootstrap/ListGroup"

import users from "users"

const User = ({ name, image }) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleToggle = () => {
    setIsSelected(!isSelected)
  }

  return (
    <div className="row align-items-center" onClick={handleToggle}>
      <div className="col-2">
        <img src={image} width={50} className="rounded-circle" alt="assigned-user" />
      </div>
      <div className="col-8">
        <p className="m-0 fw-bold">{name}</p>
      </div>
      <div className="col-2">
        {isSelected && (<i className="bi bi-check-circle-fill text-success fs-4"></i>)}
      </div>
    </div>
  )
}

const UserList = () => (
  <ListGroup>
    {
      users.map(v => (
        <ListGroup.Item key={v.id} action>
          <User name={v.name} image={v.image} />
        </ListGroup.Item>
      ))
    }
  </ListGroup>
)

export default UserList