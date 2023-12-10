import Modal from "components/Modal"
import Form from "react-bootstrap/Form"
import FormCheck from "react-bootstrap/FormCheck"
import Editor from "react-simple-wysiwyg"

import "./TaskModal.css"

const TaskModal = ({
  show, modalTitle, title, description, priority, isTemplate,
  onTitleChange, onDescriptionChange, onPriorityChange,
  onTemplateChange, onClose, onConfirm
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
          <FormCheck
            checked={isTemplate}
            label="Use as a template"
            className="mb-3"
            onChange={onTemplateChange}
          />

          {
            !isTemplate && (
              <Form.Control
                value={title}
                placeholder="Title"
                className="mb-3"
                onChange={onTitleChange}
              />
            )
          }

          <Editor value={description} onChange={onDescriptionChange} />

          {
            !isTemplate && (
              <Form.Select value={priority} onChange={onPriorityChange} className="mt-3">
                <option value="" className="text-secondary fw-bold">No Priority</option>
                <option value="low" className="text-warning fw-bold">Low Priority</option>
                <option value="medium" className="text-success fw-bold">Medium Priority</option>
                <option value="high" className="text-danger fw-bold">High Priority</option>
              </Form.Select>
            )
          }
        </div>
      </div>
    }
  />
)

export default TaskModal