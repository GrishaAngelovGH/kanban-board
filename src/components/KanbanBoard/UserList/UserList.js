import { useState, useEffect } from "react"

import ListGroup from "react-bootstrap/ListGroup"

import User from "components/Users/User"

import users from "users"

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