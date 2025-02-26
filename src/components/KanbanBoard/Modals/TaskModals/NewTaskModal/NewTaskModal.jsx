import { useState } from "react"

import TaskModal from "../TaskModal"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const NewTaskModal = ({ show, onClose, onConfirm }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [isTemplate, setIsTemplate] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

  const handleTemplateChange = checked => {
    setIsTemplate(checked)
    setTitle("")
    setPriority("")
  }

  const handleShowTemplatesChange = () => {
    setShowTemplates(!showTemplates)
  }

  const handleClose = () => {
    clearFields()
    onClose()
  }

  const handleConfirm = () => {
    onConfirm(title, description, priority, isTemplate)
    clearFields()
  }

  const clearFields = () => {
    setTitle("")
    setDescription("")
    setPriority("")
    setIsTemplate(false)
    setShowTemplates(false)
  }

  const templates = boardRepository.getAllTemplates()

  const handlers = {
    onShowTemplatesChange: handleShowTemplatesChange,
    onTitleChange: setTitle,
    onDescriptionChange: setDescription,
    onPriorityChange: setPriority,
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