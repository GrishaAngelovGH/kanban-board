import Modal from "components/Modal"

const ClearBoardModal = ({ show, onClose, onConfirm }) => (
  <Modal
    show={show}
    onClose={onClose}
    onConfirm={onConfirm}
    title="Clear Kanban Board"
    body={
      <p>Are you sure that you want to clear Kanban Board?</p>
    }
  />
)

export default ClearBoardModal