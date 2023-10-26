import { useState } from "react"

import Modal from "components/Modal"
import UserList from "components/KanbanBoard/UserList"

const AssignUserModal = ({ show, task, onClose, onConfirm }) => {
  const [ids, setIds] = useState([])

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={onConfirm}
      title={<span>Assign users to the <span className="fw-bold">"{task?.title}"</span> task</span>}
      disabledConfirm={!ids.length}
      body={
        <UserList onUpdate={setIds} />
      }
    />
  )
}

export default AssignUserModal