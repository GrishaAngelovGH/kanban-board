import UserModal from "components/KanbanBoard/Modals/UserModal"

const AssignUserModal = ({ show, task, onClose, onConfirm }) => {
  const handleConfirm = ids => {
    onConfirm(task.id, ids)
  }

  return (
    <UserModal
      show={show}
      title={<span>Assign users to the <span className="fw-bold">"{task?.title}"</span> task</span>}
      assignedIds={task?.assignedIds}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  )
}

export default AssignUserModal