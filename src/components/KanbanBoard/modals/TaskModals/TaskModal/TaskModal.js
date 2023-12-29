import { useState } from "react"

import Modal from "components/Modal"

import Form from "react-bootstrap/Form"
import ToggleButton from "react-bootstrap/ToggleButton"
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup"

import parse from "html-react-parser"
import Editor from "react-simple-wysiwyg"

import "./TaskModal.css"

const TaskModal = ({
  show, isEdit, modalTitle, title, description,
  priority, isTemplate, templates, showTemplates, handlers
}) => {
  const [value, setValue] = useState([])

  const {
    onShowTemplatesChange,
    onTitleChange,
    onDescriptionChange,
    onPriorityChange,
    onTemplateChange,
    onClose,
    onConfirm
  } = handlers

  const handleClose = () => {
    setValue([])
    onClose()
  }

  const handleConfirm = () => {
    setValue([])
    onConfirm()
  }

  return (
    <Modal
      show={show}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title={modalTitle}
      disabledConfirm={(!title.length && !isTemplate) || !description.length}
      body={
        <div className="row overflow-auto task-modal">
          <div className="col-md-12">
            {
              !isEdit && (
                <ToggleButtonGroup type="checkbox" className="mb-3" value={value} onChange={setValue}>
                  {
                    !showTemplates && (
                      <ToggleButton id="tbg-check-1" value={1} variant="outline-primary" onChange={onTemplateChange} >
                        Use as a template
                      </ToggleButton>)
                  }
                  <ToggleButton id="tbg-check-2" value={2} variant="outline-primary" onChange={onShowTemplatesChange}>
                    Create from a template
                  </ToggleButton>
                </ToggleButtonGroup>
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
                  <p className="text-secondary">{parse(v.description)}</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => {
                      onDescriptionChange({ target: { value: v.description } })
                      onShowTemplatesChange()
                      setValue([])
                    }}
                  >
                    Use
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      }
    />
  )
}

export default TaskModal