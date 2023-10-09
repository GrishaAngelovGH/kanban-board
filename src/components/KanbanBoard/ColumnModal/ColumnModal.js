import { useState } from "react"

import Modal from "components/Modal"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const ColumnModal = ({ show, onClose, onConfirm }) => {
  const [title, setTitle] = useState("")

  const handleTitleInputChange = ({ target: { value } }) => {
    setTitle(value)
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Create New Column"
      disabledConfirm={!title.length}
      body={
        <div className="row">
          <div className="col-md-12">
            <Form.Control
              value={title}
              placeholder="Title"
              className="mb-3"
              onChange={handleTitleInputChange}
            />

            <FloatingLabel
              label="Description (optional)"
            >
              <Form.Control as="textarea" />
            </FloatingLabel>
          </div>
        </div>
      }
    />
  )
}

export default ColumnModal