import UserList from "components/KanbanBoard/UserList"
import Modal from "components/Modal"

const AssignUserModal = ({ show, onClose, onConfirm }) => (
  <Modal
    show={show}
    onClose={onClose}
    onConfirm={onConfirm}
    title="Assign users"
    body={
      <UserList />
    }
  />
)

export default AssignUserModal