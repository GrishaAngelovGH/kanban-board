import ListGroup from "react-bootstrap/ListGroup"

import users from "users"

const User = ({ name, image }) => {
  return (
    <div className="row align-items-center">
      <div className="col-2">
        <img src={image} width={50} className="rounded-circle" alt="assigned-user" />
      </div>
      <div className="col-10">
        <p className="m-0 fw-bold">{name}</p>
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