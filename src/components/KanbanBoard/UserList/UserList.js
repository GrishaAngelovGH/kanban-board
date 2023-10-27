import { useState, useEffect } from "react"

import ListGroup from "react-bootstrap/ListGroup"

import users from "users"

const User = ({ id, name, image, selected, onSelect }) => {
  const [isSelected, setIsSelected] = useState(selected)

  const handleToggle = () => {
    setIsSelected(!isSelected)
    onSelect(!isSelected, id)
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

const UserList = ({ task, onUpdate }) => {
  const [ids, setIds] = useState(task.assignedIds)

  const handleSelectUser = (shouldAdd, id) => {
    if (shouldAdd) {
      setIds([...ids, id])
    }

    if (!shouldAdd) {
      setIds(ids.filter(v => v !== id))
    }
  }

  useEffect(() => {
    onUpdate(ids)
  }, [ids, onUpdate])

  return (
    <ListGroup>
      {
        users.map(v => {
          const selected = ids.includes(v.id)

          return (
            <ListGroup.Item key={v.id} action>
              <User
                id={v.id}
                name={v.name}
                image={v.image}
                selected={selected}
                onSelect={handleSelectUser}
              />
            </ListGroup.Item>
          )
        })
      }
    </ListGroup>
  )
}

export default UserList