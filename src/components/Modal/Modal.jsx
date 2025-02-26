import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

const ModalWrapper = ({ show, onClose, onConfirm, title, body, disabledConfirm, hideConfirm }) => (
  <Modal show={show} onHide={onClose} backdrop="static">
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
      {
        !hideConfirm && (
          <Button variant="primary" disabled={disabledConfirm} onClick={onConfirm}>
            Confirm
          </Button>
        )
      }
    </Modal.Footer>
  </Modal>
)

export default ModalWrapper