import { useState, useEffect } from "react"

import Modal from "components/Modal"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const EditTaskModal = ({ show, task, onClose, onConfirm }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")

  const handleTitleChange = ({ target: { value } }) => {
    setTitle(value)
  }

  const handleDescriptionChange = ({ target: { value } }) => {
    setDescription(value)
  }

  const handlePriorityChange = ({ target: { value } }) => {
    setPriority(value)
  }

  const handleConfirm = () => {
    onConfirm({ ...task, title, description, priority })
    setTitle("")
    setDescription("")
    setPriority("")
  }

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      setPriority(task.priority)
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
              className="mb-3"
            >
              <Form.Control as="textarea" value={description} onChange={handleDescriptionChange} />
            </FloatingLabel>

            <Form.Select value={priority} onChange={handlePriorityChange}>
              <option value="" className="text-secondary fw-bold">No Priority</option>
              <option value="low" className="text-warning fw-bold">Low Priority</option>
              <option value="medium" className="text-success fw-bold">Medium Priority</option>
              <option value="high" className="text-danger fw-bold">High Priority</option>
            </Form.Select>
          </div>
        </div>
      }
    />
  )
}

export default EditTaskModal