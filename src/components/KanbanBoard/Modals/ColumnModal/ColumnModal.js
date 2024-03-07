import { useState } from "react"

import Modal from "components/Modal"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const ColumnModal = ({ show, onClose, onConfirm }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleTitleChange = ({ target: { value } }) => {
    setTitle(value)
  }

  const handleDescriptionChange = ({ target: { value } }) => {
    setDescription(value)
  }

  const handleConfirm = () => {
    onConfirm(title, description)
    setTitle("")
    setDescription("")
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Create New Column"
      disabledConfirm={!title.length}
      body={
        <div className="row">
          <div className="col-md-12">
            <Form.Control
              value={title}
              placeholder="Title"
              className="mb-3"
              onChange={handleTitleChange}
            />

            <FloatingLabel
              label="Description (optional)"
            >
              <Form.Control as="textarea" value={description} onChange={handleDescriptionChange} />
            </FloatingLabel>
          </div>
        </div>
      }
    />
  )
}

export default ColumnModal