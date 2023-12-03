import Modal from "components/Modal"

const Users = ({ show, onClose, onConfirm }) => (
  <Modal
    show={show}
    onClose={onClose}
    onConfirm={onConfirm}
    title="Manage Users"
    body={
      <div>Users</div>
    }
  />
)

export default Users