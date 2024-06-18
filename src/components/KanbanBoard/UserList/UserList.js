import { useState, useEffect } from "react"

import ListGroup from "react-bootstrap/ListGroup"

import User from "./User"

import userRepository from "persistent/persistentUserRepository"

import "./UserList.css"

const UserList = ({ assignedIds, onUpdate }) => {
  const [ids, setIds] = useState(assignedIds)

  const handleSelectUser = (shouldAdd, id) => {
    setIds(
      shouldAdd ?
        [...ids, id] :
        ids.filter(v => v !== id)
    )
  }

  useEffect(() => {
    onUpdate(ids)
  }, [ids, onUpdate])

  const users = userRepository.getUsers()

  return (
    <ListGroup className="overflow-auto user-list">
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