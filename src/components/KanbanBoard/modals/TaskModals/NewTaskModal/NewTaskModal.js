import { useState } from "react"

import TaskModal from "../TaskModal"

const NewTaskModal = ({ show, onClose, onConfirm }) => {
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
    onConfirm(title, description, priority)
    setTitle("")
    setDescription("")
    setPriority("")
  }

  return (
    <TaskModal
      show={show}
      modalTitle="Create New Task"
      title={title}
      description={description}
      priority={priority}
      onTitleChange={handleTitleChange}
      onDescriptionChange={handleDescriptionChange}
      onPriorityChange={handlePriorityChange}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  )
}

export default NewTaskModal