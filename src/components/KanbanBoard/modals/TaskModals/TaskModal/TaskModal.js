import Modal from "components/Modal"

import Form from "react-bootstrap/Form"
import FormCheck from "react-bootstrap/FormCheck"

import Editor from "react-simple-wysiwyg"

import "./TaskModal.css"

const TaskModal = ({
  show, isEdit, modalTitle, title, description, priority, isTemplate, templates, showTemplates,
  onShowTemplatesChange, onTitleChange, onDescriptionChange,
  onPriorityChange, onTemplateChange, onClose, onConfirm
}) => (
  <Modal
    show={show}
    onClose={onClose}
    onConfirm={onConfirm}
    title={modalTitle}
    disabledConfirm={(!title.length && !isTemplate) || !description.length}
    body={
      <div className="row overflow-auto task-modal">
        <div className="col-md-12">
          {
            !isEdit && !showTemplates && (
              <FormCheck
                checked={isTemplate}
                label="Use as a template"
                className="mb-3"
                onChange={onTemplateChange}
              />
            )
          }

          {
            !isEdit && (<FormCheck
              checked={showTemplates}
              label="Create from a template"
              className="mb-3"
              onChange={onShowTemplatesChange}
            />
            )
          }

          {
            !isTemplate && !showTemplates && (
              <Form.Control
                value={title}
                placeholder="Title"
                className="mb-3"
                onChange={onTitleChange}
              />
            )
          }

          {
            !showTemplates && <Editor value={description} onChange={onDescriptionChange} />
          }

          {
            !isTemplate && !showTemplates && (
              <Form.Select value={priority} onChange={onPriorityChange} className="mt-3">
                <option value="" className="text-secondary fw-bold">No Priority</option>
                <option value="low" className="text-warning fw-bold">Low Priority</option>
                <option value="medium" className="text-success fw-bold">Medium Priority</option>
                <option value="high" className="text-danger fw-bold">High Priority</option>
              </Form.Select>
            )
          }

          {
            showTemplates && templates.map(v => (
              <div key={v.id} className="border border-3 rounded m-3 p-3 shadow">
                <p className="text-secondary">{v.description}</p>
              </div>
            ))
          }
        </div>
      </div>
    }
  />
)

export default TaskModal