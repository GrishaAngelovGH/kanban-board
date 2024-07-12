import { useState } from "react"

import TaskModal from "../TaskModal"

const EditTaskModal = ({ show, task, onClose, onConfirm }) => {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [priority, setPriority] = useState(task.priority)
  const [isTemplate, setIsTemplate] = useState(task.isTemplate)

  const handleConfirm = () => {
    onConfirm({ ...task, title, description, priority, isTemplate })
    setTitle("")
    setDescription("")
    setPriority("")
    setIsTemplate(false)
  }

  const handlers = {
    onTitleChange: setTitle,
    onDescriptionChange: setDescription,
    onPriorityChange: setPriority,
    onTemplateChange: setIsTemplate,
    onClose,
    onConfirm: handleConfirm
  }

  return (
    <TaskModal
      show={show}
      isEdit={true}
      modalTitle="Edit Task"
      title={title}
      description={description}
      priority={priority}
      isTemplate={isTemplate}
      handlers={handlers}
    />
  )
}

export default EditTaskModal