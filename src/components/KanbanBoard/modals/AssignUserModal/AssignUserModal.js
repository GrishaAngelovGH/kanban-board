import { useState } from "react"

import Modal from "components/Modal"
import UserList from "components/KanbanBoard/UserList"

const AssignUserModal = ({ show, onClose, onConfirm }) => {
  const [ids, setIds] = useState([])

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Assign users"
      disabledConfirm={!ids.length}
      body={
        <UserList onUpdate={setIds} />
      }
    />
  )
}

export default AssignUserModal