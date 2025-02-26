import UserModal from "components/KanbanBoard/Modals/UserModal"

const AutoAssignUserModal = ({ show, column, onClose, onConfirm }) => {
  const handleConfirm = ids => {
    onConfirm(column.id, ids)
  }

  return (
    <UserModal
      show={show}
      title={<span>Auto assign users to the <span className="fw-bold">"{column?.title}"</span> column</span>}
      assignedIds={column?.assignedIds || []}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  )
}

export default AutoAssignUserModal