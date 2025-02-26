import Toast from "react-bootstrap/Toast"

const ToastWrapper = ({ show, title, body, onClose, delay = 5000 }) => (
  <Toast show={show} delay={delay} autohide className="mt-2" onClose={onClose}>
    <Toast.Header>
      <strong className="me-auto">{title}</strong>
    </Toast.Header>
    <Toast.Body>{body}</Toast.Body>
  </Toast>
)

export default ToastWrapper