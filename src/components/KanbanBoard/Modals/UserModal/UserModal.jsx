import { useState } from "react"

import Modal from "components/Modal"
import UserList from "components/KanbanBoard/UserList"

const UserModal = ({ show, title, assignedIds, onClose, onConfirm }) => {
  const [ids, setIds] = useState([])

  const handleConfirm = () => {
    onConfirm(ids)
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={title}
      body={
        <UserList assignedIds={assignedIds} onUpdate={setIds} />
      }
    />
  )
}

export default UserModal