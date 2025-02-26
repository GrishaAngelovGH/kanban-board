import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

const TaskLimitInput = ({ currentLimit, disabledConfirm, onChange, onCancel, onConfirm }) => {
  const buttons = [
    { variant: "secondary", disabled: false, onClick: onCancel, label: "Cancel" },
    { variant: "success", disabled: disabledConfirm, onClick: onConfirm, label: "OK" }
  ]

  return (
    <InputGroup>
      <Form.Control
        type="number"
        min={0}
        value={currentLimit}
        onChange={onChange}
      />
      {
        buttons.map((v, i) => (
          <Button
            key={i}
            variant={v.variant}
            disabled={v.disabled}
            onClick={v.onClick}
          >
            {v.label}
          </Button>
        ))
      }
    </InputGroup>
  )
}

export default TaskLimitInput 