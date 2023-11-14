import Modal from "components/Modal"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const TaskModal = ({
  show, modalTitle, title, description, priority,
  onTitleChange, onDescriptionChange, onPriorityChange, onClose, onConfirm
}) => (
  <Modal
    show={show}
    onClose={onClose}
    onConfirm={onConfirm}
    title={modalTitle}
    disabledConfirm={!title.length || !description.length}
    body={
      <div className="row">
        <div className="col-md-12">
          <Form.Control
            value={title}
            placeholder="Title"
            className="mb-3"
            onChange={onTitleChange}
          />

          <FloatingLabel
            label="Description"
            className="mb-3"
          >
            <Form.Control as="textarea" value={description} onChange={onDescriptionChange} />
          </FloatingLabel>

          <Form.Select value={priority} onChange={onPriorityChange}>
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

export default TaskModal