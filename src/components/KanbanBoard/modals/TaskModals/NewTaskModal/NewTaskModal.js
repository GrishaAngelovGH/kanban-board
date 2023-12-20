import { useState } from "react"

import TaskModal from "../TaskModal"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const NewTaskModal = ({ show, onClose, onConfirm }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [isTemplate, setIsTemplate] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

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

  const handleShowTemplatesChange = () => {
    setShowTemplates(!showTemplates)
  }

  const handleClose = () => {
    setTitle("")
    setDescription("")
    setPriority("")
    setIsTemplate(false)
    setShowTemplates(false)

    onClose()
  }

  const handleConfirm = () => {
    onConfirm(title, description, priority, isTemplate)
    setTitle("")
    setDescription("")
    setPriority("")
    setIsTemplate(false)
    setShowTemplates(false)
  }

  const templates = boardRepository.getAllTemplates()

  const handlers = {
    onShowTemplatesChange: handleShowTemplatesChange,
    onTitleChange: handleTitleChange,
    onDescriptionChange: handleDescriptionChange,
    onPriorityChange: handlePriorityChange,
    onTemplateChange: handleTemplateChange,
    onClose: handleClose,
    onConfirm: handleConfirm
  }

  return (
    <TaskModal
      show={show}
      modalTitle="Create New Task"
      title={title}
      description={description}
      priority={priority}
      isTemplate={isTemplate}
      templates={templates}
      showTemplates={showTemplates}
      handlers={handlers}
    />
  )
}

export default NewTaskModal