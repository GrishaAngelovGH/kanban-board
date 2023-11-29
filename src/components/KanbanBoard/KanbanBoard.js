import { useState, useRef } from "react"
import { DndContext } from "@dnd-kit/core"

import EditableText from "components/EditableText"
import Toast from "components/Toast"

import ToastContainer from "react-bootstrap/ToastContainer"

import ButtonPanel from "./ButtonPanel"
import Column from "./Column"
import EmptyBoard from "./EmptyBoard"
import NavigationButtons from "./NavigationButtons"

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

import geometricBackgroundImage from "assets/images/backgrounds/geometric-triangle-shapes-background.jpg"
import natureBackgroundImage from "assets/images/backgrounds/nature-background.jpg"

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
  const [columns, setColumns] = useState(boardRepository.getColumns())

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const scrollRef = useRef()

  const showToastWithMessage = message => {
    setToastMessage(message)
    setShowToast(true)
  }

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

    showToastWithMessage("Kanban Board is successfully generated")
  }

  const handleUpdateBoardTitle = title => {
    boardRepository.updateBoardTitle(title)
    setColumns(boardRepository.getColumns())
    onUpdate()

    showToastWithMessage("Board title is successfully changed")
  }

  const handleConfirmCreateColumn = (title, description) => {
    boardRepository.createColumn(title, description)
    setShowColumnModal(!showColumnModal)
    setColumns(boardRepository.getColumns())
    onUpdate()

    showToastWithMessage("New column is successfully created")
  }

  const handleConfirmClearBoard = () => {
    boardRepository.clearBoard()
    setColumns([])
    setShowClearBoardModal(!showClearBoardModal)
    onUpdate()

    showToastWithMessage("Kanban Board is successfully cleared")
  }

  const handleConfirmCreateTask = (title, description, priority) => {
    boardRepository.createTask(columnId, title, description, priority)
    setShowAddTaskModal(!showAddTaskModal)
    setColumns(boardRepository.getColumns())
    onUpdate()

    showToastWithMessage("New task is successfully created")
  }

  const handleConfirmEditTask = task => {
    boardRepository.updateTask(task, columnId)
    setShowEditTaskModal(!showEditTaskModal)
    setColumns(boardRepository.getColumns())
    onUpdate()

    showToastWithMessage("Task is successfully edited")
  }

  const handleConfirmAssignUsers = (taskId, assignedIds) => {
    boardRepository.assignUsersToTask(taskId, columnId, assignedIds)
    setShowAssignUserModal(!showAssignUserModal)
    setColumns(boardRepository.getColumns())
    onUpdate()

    showToastWithMessage("Users are successfully assigned")
  }

  const handleToggleTaskLock = (taskId, columnId, isLocked) => {
    boardRepository.updateTaskLockStatus(taskId, columnId, isLocked)
    setColumns(boardRepository.getColumns())
    onUpdate()

    showToastWithMessage("Task's lock status is successfully changed")
  }

  const handleConfirmKanbanBoardImport = kanbanBoardJson => {
    boardRepository.setColumnsJSON(kanbanBoardJson)
    onToggleUploadKanbanBoardModal()
    setColumns(boardRepository.getColumns())
    onUpdate()

    showToastWithMessage("Kanban Board is successfully imported")
  }

  const handleMarkColumnAsDone = columnId => {
    boardRepository.toggleMarkAsDoneColumn(columnId)
    setColumns(boardRepository.getColumns())
    onUpdate()

    showToastWithMessage("Column status is successfully changed")
  }

  const handleUpdateColumn = (id, value, isTextArea) => {
    isTextArea ?
      boardRepository.updateColumnDescription(id, value) :
      boardRepository.updateColumnTitle(id, value)

    setColumns(boardRepository.getColumns())
    onUpdate()

    showToastWithMessage("Column is successfully updated")
  }

  const handleDeleteColumn = columnId => {
    boardRepository.deleteColumn(columnId)
    setColumns(boardRepository.getColumns())
    onUpdate()

    showToastWithMessage("Column is successfully deleted")
  }

  const handleDeleteTask = (taskId, columnId) => {
    boardRepository.deleteTask(taskId, columnId)
    setColumns(boardRepository.getColumns())
    onUpdate()

    showToastWithMessage("Task is successfully deleted")
  }

  const handleDeleteAllTasksForColumn = columnId => {
    boardRepository.deleteAllTasksForColumn(columnId)
    setColumns(boardRepository.getColumns())
    onUpdate()

    showToastWithMessage("All tasks for the given column are successfully deleted")
  }

  const handleSetColumnLimit = (columnId, limit) => {
    boardRepository.setColumnLimit(columnId, limit)
    setColumns(boardRepository.getColumns())
    onUpdate()

    showToastWithMessage("Column limit is successfully updated")
  }

  const handleDragEnd = ({ active: { id, data: { current: { columnId } } }, over }) => {
    if (over) {
      const fromColumnId = columnId
      const toColumnId = over.id
      const taskId = id

      boardRepository.moveTask(fromColumnId, toColumnId, taskId)
      setColumns(boardRepository.getColumns())
      onUpdate()

      showToastWithMessage("Task is successfully moved")
    } else {
      showToastWithMessage("The task could not be moved because the column has reached its limit")
    }
  }

  const background = settingsRepository.getBackground()
  const backgroundImage = backgrounds[background]

  const isSingleRowView = settingsRepository.isSingleRowView()

  const boardTitle = boardRepository.getBoardTitle()
  const boardTitleClassName = settingsRepository.hasNatureBackground() ? "text-white" : "text-secondary"

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

          {
            columns.length > 0 && (
              <div className="row align-items-center p-1">
                {
                  isSingleRowView && (
                    <div className="col-2">
                      <NavigationButtons ref={scrollRef} />
                    </div>
                  )
                }
                <div className={isSingleRowView ? "col-10" : "col-12"}>
                  <EditableText onBlur={handleUpdateBoardTitle}>
                    <h1 className={`m-0 text-center ${boardTitleClassName}`}>{boardTitle}</h1>
                  </EditableText>
                </div>
              </div>
            )
          }

          <div ref={scrollRef} className={`row ${isSingleRowView ? "flex-nowrap overflow-x-hidden pt-3 p-5" : "p-5"}`}>
            {
              columns.map(v => (
                <Column
                  key={v.id}
                  id={v.id}
                  title={v.title}
                  description={v.description}
                  tasks={v.items}
                  limit={v.limit}
                  markedAsDone={v.markedAsDone}
                  onDeleteColumn={handleDeleteColumn}
                  onAddTask={toggleAddTaskModal}
                  onEditTask={toggleEditTaskModal}
                  onDeleteTask={handleDeleteTask}
                  onDeleteAllTasks={handleDeleteAllTasksForColumn}
                  onAssignUser={toggleAssignUserModal}
                  onToggleTaskLock={handleToggleTaskLock}
                  onMarkColumnAsDone={handleMarkColumnAsDone}
                  onSetColumnLimit={handleSetColumnLimit}
                  onColumnUpdate={handleUpdateColumn}
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