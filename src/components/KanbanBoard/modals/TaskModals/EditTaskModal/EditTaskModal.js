import { useState, useEffect } from "react"

import TaskModal from "../TaskModal"

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
    <TaskModal
      show={show}
      modalTitle="Edit Task"
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

export default EditTaskModal