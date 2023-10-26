import { useState } from "react"

import Modal from "components/Modal"
import UserList from "components/KanbanBoard/UserList"

const AssignUserModal = ({ show, task, onClose, onConfirm }) => {
  const [ids, setIds] = useState([])

  const handleConfirm = () => {
    onConfirm(task.id, ids)
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={<span>Assign users to the <span className="fw-bold">"{task?.title}"</span> task</span>}
      disabledConfirm={!ids.length}
      body={
        <UserList onUpdate={setIds} />
      }
    />
  )
}

export default AssignUserModal