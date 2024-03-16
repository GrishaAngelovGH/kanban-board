import AssignUserModal from "./AssignUserModal"
import ClearBoardModal from "./ClearBoardModal"
import ColumnModal from "./ColumnModal"
import EditTaskModal from "./TaskModals/EditTaskModal"
import NewTaskModal from "./TaskModals/NewTaskModal"
import UploadBoardModal from "./UploadBoardModal"
import AutoAssignUserModal from "./AutoAssignUserModal"

import boardRepository from "persistent/persistentKanbanBoardRepository"
import history from "persistent/history"

const Modals = ({ column, task, show, update }) => {
  const {
    showColumnModal,
    showClearBoardModal,
    showToastWithMessage,
    showAddTaskModal,
    showEditTaskModal,
    showAssignUserModal,
    showAutoAssignUserModal,
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
    setShowAutoAssignUserModal,
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
    boardRepository.createTask(column.id, title, description, priority, isTemplate)
    setShowAddTaskModal(!showAddTaskModal)
    onUpdate()

    showToastWithMessage("New task is successfully created")
  }

  const handleConfirmEditTask = task => {
    boardRepository.updateTask(task, column.id)
    setShowEditTaskModal(!showEditTaskModal)
    onUpdate()

    showToastWithMessage("Task is successfully edited")
  }

  const handleConfirmAssignUsers = (taskId, assignedIds) => {
    boardRepository.assignUsersToTask(taskId, column.id, assignedIds)
    setShowAssignUserModal(!showAssignUserModal)
    onUpdate()

    showToastWithMessage("Users are successfully assigned")
  }

  const handleConfirmAutoAssignUsers = (columnId, assignedIds) => {
    boardRepository.assignUsersToColumn(columnId, assignedIds)
    setShowAutoAssignUserModal(!showAutoAssignUserModal)
    onUpdate()

    showToastWithMessage("Users are successfully auto assigned")
  }

  const handleConfirmKanbanBoardImport = ({ title, columns, history: historyItems }) => {
    boardRepository.updateBoardTitle(title)
    boardRepository.setColumnsJSON(columns)
    history.setColumnsJSON(historyItems)
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

      <AutoAssignUserModal
        show={showAutoAssignUserModal}
        column={column}
        onClose={() => { setShowAutoAssignUserModal(!showAutoAssignUserModal) }}
        onConfirm={handleConfirmAutoAssignUsers}
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