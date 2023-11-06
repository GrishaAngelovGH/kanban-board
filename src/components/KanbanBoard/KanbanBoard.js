import { useState, useEffect } from "react"
import { DndContext } from "@dnd-kit/core"

import Toast from "components/Toast"
import ToastContainer from "react-bootstrap/ToastContainer"

import ButtonPanel from "./ButtonPanel"
import Column from "./Column"
import EmptyBoard from "./EmptyBoard"

import ClearBoardModal from "./modals/ClearBoardModal"
import ColumnModal from "./modals/ColumnModal"

import AssignUserModal from "./modals/AssignUserModal"
import EditTaskModal from "./modals/TaskModals/EditTaskModal"
import NewTaskModal from "./modals/TaskModals/NewTaskModal"
import UploadBoardModal from "./modals/UploadBoardModal"

import boardGenerator from "persistent/persistentKanbanBoardGenerator"
import boardRepository from "persistent/persistentKanbanBoardRepository"
import settingsRepository from "persistent/persistentSettingsRepository"

import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

import "./KanbanBoard.css"

import natureBackgroundImage from "assets/images/backgrounds/nature-background.jpg"
import geometricBackgroundImage from "assets/images/backgrounds/geometric-triangle-shapes-background.jpg"

const backgrounds = {
  "Nature Background": natureBackgroundImage,
  "Geometric Background": geometricBackgroundImage
}

const KanbanBoard = ({ showCalendar, showUploadBoardModal, onUpdate, onToggleUploadKanbanBoardModal }) => {
  const [showColumnModal, setShowColumnModal] = useState(false)
  const [showClearBoardModal, setShowClearBoardModal] = useState(false)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showEditTaskModal, setShowEditTaskModal] = useState(false)
  const [showAssignUserModal, setShowAssignUserModal] = useState(false)

  const [columnId, setColumnId] = useState("")
  const [task, setTask] = useState(null)
  const [columns, setColumns] = useState([])

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const toggleColumnModal = () => {
    setShowColumnModal(!showColumnModal)
  }

  const toggleClearBoardModal = () => {
    setShowClearBoardModal(!showClearBoardModal)
  }

  const toggleAddTaskModal = columnId => {
    setColumnId(columnId)
    setShowAddTaskModal(!showAddTaskModal)
  }

  const toggleEditTaskModal = (task, columnId) => {
    setColumnId(columnId)
    setTask(task)
    setShowEditTaskModal(!showEditTaskModal)
  }

  const toggleAssignUserModal = (task, columnId) => {
    setTask(task)
    setColumnId(columnId)
    setShowAssignUserModal(!showAssignUserModal)
  }

  const handleGenerateBoardButtonClick = () => {
    boardGenerator.generate()
    setColumns(boardRepository.getColumns())
    onUpdate()

    setToastMessage("Kanban Board is successfully generated")
    setShowToast(true)
  }

  const handleConfirmCreateColumn = (title, description) => {
    boardRepository.createColumn(title, description)
    setShowColumnModal(!showColumnModal)
    onUpdate()

    setToastMessage("New column is successfully created")
    setShowToast(true)
  }

  const handleConfirmClearBoard = () => {
    boardRepository.deleteAllColumns()
    setColumns([])
    setShowClearBoardModal(!showClearBoardModal)
    onUpdate()

    setToastMessage("Kanban Board is successfully cleared")
    setShowToast(true)
  }

  const handleConfirmCreateTask = (title, description, priority) => {
    boardRepository.createTask(columnId, title, description, priority)
    setShowAddTaskModal(!showAddTaskModal)
    setColumns(boardRepository.getColumns())
    onUpdate()

    setToastMessage("New task is successfully created")
    setShowToast(true)
  }

  const handleConfirmEditTask = task => {
    boardRepository.updateTask(task, columnId)
    setShowEditTaskModal(!showEditTaskModal)
    setColumns(boardRepository.getColumns())
    onUpdate()

    setToastMessage("Task is successfully edited")
    setShowToast(true)
  }

  const handleConfirmAssignUsers = (taskId, assignedIds) => {
    boardRepository.assignUsersToTask(taskId, columnId, assignedIds)
    setShowAssignUserModal(!showAssignUserModal)
    setColumns(boardRepository.getColumns())
    onUpdate()

    setToastMessage("Users are successfully assigned")
    setShowToast(true)
  }

  const handleConfirmKanbanBoardImport = kanbanBoardJson => {
    boardRepository.setColumnsJSON(kanbanBoardJson)
    onToggleUploadKanbanBoardModal()
    setColumns(boardRepository.getColumns())
    onUpdate()

    setToastMessage("Kanban Board is successfully imported")
    setShowToast(true)
  }

  const handleMarkColumnAsDone = columnId => {
    boardRepository.toggleMarkAsDoneColumn(columnId)
    setColumns(boardRepository.getColumns())
    onUpdate()

    setToastMessage("Column status is successfully changed")
    setShowToast(true)
  }

  const handleDeleteColumn = columnId => {
    boardRepository.deleteColumn(columnId)
    setColumns(boardRepository.getColumns())
    onUpdate()

    setToastMessage("Column is successfully deleted")
    setShowToast(true)
  }

  const handleDeleteTask = (taskId, columnId) => {
    boardRepository.deleteTask(taskId, columnId)
    setColumns(boardRepository.getColumns())
    onUpdate()

    setToastMessage("Task is successfully deleted")
    setShowToast(true)
  }

  const handleDeleteAllTasksForColumn = columnId => {
    boardRepository.deleteAllTasksForColumn(columnId)
    setColumns(boardRepository.getColumns())
    onUpdate()

    setToastMessage("All tasks for the given column are successfully deleted")
    setShowToast(true)
  }

  const handleDragEnd = ({ active: { id, data: { current: { columnId } } }, over }) => {
    if (over) {
      const fromColumnId = columnId
      const toColumnId = over.id
      const taskId = id

      boardRepository.moveTask(fromColumnId, toColumnId, taskId)
      setColumns(boardRepository.getColumns())
      onUpdate()

      setToastMessage("Task is successfully moved")
      setShowToast(true)
    }
  }

  useEffect(() => {
    setColumns(boardRepository.getColumns())
  }, [showColumnModal])

  const background = settingsRepository.getBackground()
  const backgroundImage = backgrounds[background]

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="row kanban-board" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none" }}>
        <div className="col-md-12">
          <ToastContainer position="top-center">
            <Toast show={showToast} title="Kanban Board" body={toastMessage} onClose={() => setShowToast(false)} />
          </ToastContainer>

          {showCalendar && <Calendar />}

          {
            !columns.length && (<EmptyBoard />)
          }

          <div className="row p-5">
            {
              columns.map(v => (
                <Column
                  key={v.id}
                  id={v.id}
                  title={v.title}
                  description={v.description}
                  tasks={v.items}
                  markedAsDone={v.markedAsDone}
                  onDeleteColumn={handleDeleteColumn}
                  onAddTask={toggleAddTaskModal}
                  onEditTask={toggleEditTaskModal}
                  onDeleteTask={handleDeleteTask}
                  onDeleteAllTasks={handleDeleteAllTasksForColumn}
                  onAssignUser={toggleAssignUserModal}
                  onMarkColumnAsDone={handleMarkColumnAsDone}
                />
              ))
            }
          </div>

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

          <ButtonPanel
            onColumnButtonClick={toggleColumnModal}
            onClearBoardButtonClick={toggleClearBoardModal}
            onGenerateBoardButtonClick={handleGenerateBoardButtonClick}
          />
        </div>
      </div>
    </DndContext>
  )
}

export default KanbanBoard