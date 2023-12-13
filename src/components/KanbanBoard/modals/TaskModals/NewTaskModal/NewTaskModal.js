import { useState } from "react"

import TaskModal from "../TaskModal"

const NewTaskModal = ({ show, onClose, onConfirm }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [isTemplate, setIsTemplate] = useState(false)

  const handleTitleChange = ({ target: { value } }) => {
    setTitle(value)
  }

  const handleDescriptionChange = ({ target: { value } }) => {
    setDescription(value)
  }

  const handlePriorityChange = ({ target: { value } }) => {
    setPriority(value)
  }

  const handleTemplateChange = ({ target: { checked } }) => {
    setIsTemplate(checked)
    setTitle("")
    setPriority("")
  }

  const handleConfirm = () => {
    onConfirm(title, description, priority, isTemplate)
    setTitle("")
    setDescription("")
    setPriority("")
    setIsTemplate(false)
  }

  return (
    <TaskModal
      show={show}
      modalTitle="Create New Task"
      title={title}
      description={description}
      priority={priority}
      isTemplate={isTemplate}
      onTitleChange={handleTitleChange}
      onDescriptionChange={handleDescriptionChange}
      onPriorityChange={handlePriorityChange}
      onTemplateChange={handleTemplateChange}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  )
}

export default NewTaskModal