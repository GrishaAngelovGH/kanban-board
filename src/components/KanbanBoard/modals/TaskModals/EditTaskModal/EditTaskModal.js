import { useState, useEffect } from "react"

import Modal from "components/Modal"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const EditTaskModal = ({ show, task, onClose, onConfirm }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleTitleChange = ({ target: { value } }) => {
    setTitle(value)
  }

  const handleDescriptionChange = ({ target: { value } }) => {
    setDescription(value)
  }

  const handleConfirm = () => {
    onConfirm({ ...task, title, description })
    setTitle("")
    setDescription("")
  }

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
    }
  }, [task])

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Edit Task"
      disabledConfirm={!title.length || !description.length}
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
              label="Description"
            >
              <Form.Control as="textarea" value={description} onChange={handleDescriptionChange} />
            </FloatingLabel>
          </div>
        </div>
      }
    />
  )
}

export default EditTaskModal