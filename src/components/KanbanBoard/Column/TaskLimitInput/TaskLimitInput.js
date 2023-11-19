import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

const TaskLimitInput = ({ currentLimit, disabledConfirm, onChange, onCancel, onConfirm }) => (
  <InputGroup>
    <Form.Control
      type="number"
      min={0}
      value={currentLimit}
      onChange={onChange}
    />
    <Button
      variant="secondary"
      onClick={onCancel}
    >
      Cancel
    </Button>
    <Button
      variant="success"
      disabled={disabledConfirm}
      onClick={onConfirm}>
      OK
    </Button>
  </InputGroup>
)

export default TaskLimitInput 