import { useState, useEffect } from "react"

import TaskModal from "../TaskModal"

const EditTaskModal = ({ show, task, onClose, onConfirm }) => {
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
  }

  const handleConfirm = () => {
    onConfirm({ ...task, title, description, priority, isTemplate })
    setTitle("")
    setDescription("")
    setPriority("")
    setIsTemplate(false)
  }

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      setPriority(task.priority)
      setIsTemplate(task.isTemplate)
    }
  }, [task])

  return (
    <TaskModal
      show={show}
      modalTitle="Edit Task"
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

export default EditTaskModal