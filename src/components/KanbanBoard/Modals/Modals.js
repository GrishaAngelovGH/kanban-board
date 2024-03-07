import AssignUserModal from "./AssignUserModal"
import ClearBoardModal from "./ClearBoardModal"
import ColumnModal from "./ColumnModal"
import EditTaskModal from "./TaskModals/EditTaskModal"
import NewTaskModal from "./TaskModals/NewTaskModal"
import UploadBoardModal from "./UploadBoardModal"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const Modals = ({ columnId, task, show, update }) => {
  const {
    showColumnModal,
    showClearBoardModal,
    showToastWithMessage,
    showAddTaskModal,
    showEditTaskModal,
    showAssignUserModal,
    showUploadBoardModal
  } = show

  const {
    onUpdate,
    toggleColumnModal,
    setShowColumnModal,
    toggleClearBoardModal,
    setShowClearBoardModal,
    setShowAddTaskModal,
    setShowEditTaskModal,
    setShowAssignUserModal,
    onToggleUploadKanbanBoardModal
  } = update

  const handleConfirmCreateColumn = (title, description) => {
    boardRepository.createColumn(title, description)
    setShowColumnModal(!showColumnModal)
    onUpdate()

    showToastWithMessage("New column is successfully created")
  }

  const handleConfirmClearBoard = () => {
    boardRepository.clearBoard()
    setShowClearBoardModal(!showClearBoardModal)
    onUpdate()

    showToastWithMessage("Kanban Board is successfully cleared")
  }

  const handleConfirmCreateTask = (title, description, priority, isTemplate) => {
    boardRepository.createTask(columnId, title, description, priority, isTemplate)
    setShowAddTaskModal(!showAddTaskModal)
    onUpdate()

    showToastWithMessage("New task is successfully created")
  }

  const handleConfirmEditTask = task => {
    boardRepository.updateTask(task, columnId)
    setShowEditTaskModal(!showEditTaskModal)
    onUpdate()

    showToastWithMessage("Task is successfully edited")
  }

  const handleConfirmAssignUsers = (taskId, assignedIds) => {
    boardRepository.assignUsersToTask(taskId, columnId, assignedIds)
    setShowAssignUserModal(!showAssignUserModal)
    onUpdate()

    showToastWithMessage("Users are successfully assigned")
  }

  const handleConfirmKanbanBoardImport = ({ title, columns }) => {
    boardRepository.updateBoardTitle(title)
    boardRepository.setColumnsJSON(columns)
    onToggleUploadKanbanBoardModal()
    onUpdate()

    showToastWithMessage("Kanban Board is successfully imported")
  }

  return (
    <>
      <ColumnModal
        show={showColumnModal}
        onClose={toggleColumnModal}
        onConfirm={handleConfirmCreateColumn}
      />

      <ClearBoardModal
        show={showClearBoardModal}
        onClose={toggleClearBoardModal}
        onConfirm={handleConfirmClearBoard}
      />

      <NewTaskModal
        show={showAddTaskModal}
        onClose={() => { setShowAddTaskModal(!showAddTaskModal) }}
        onConfirm={handleConfirmCreateTask}
      />

      <EditTaskModal
        show={showEditTaskModal}
        task={task}
        onClose={() => { setShowEditTaskModal(!showEditTaskModal) }}
        onConfirm={handleConfirmEditTask}
      />

      <AssignUserModal
        show={showAssignUserModal}
        task={task}
        onClose={() => { setShowAssignUserModal(!showAssignUserModal) }}
        onConfirm={handleConfirmAssignUsers}
      />

      <UploadBoardModal
        show={showUploadBoardModal}
        onClose={onToggleUploadKanbanBoardModal}
        onConfirm={handleConfirmKanbanBoardImport}
      />
    </>
  )
}

export default Modals