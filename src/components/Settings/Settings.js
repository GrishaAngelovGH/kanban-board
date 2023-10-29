import Modal from "components/Modal"

const Settings = ({ show, onClose, onConfirm }) => (
  <Modal
    show={show}
    onClose={onClose}
    onConfirm={onConfirm}
    title="Settings"
  />
)

export default Settings