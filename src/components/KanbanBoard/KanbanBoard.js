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

import boardGenerator from "persistent/persistentKanbanBoardGenerator"
import boardRepository from "persistent/persistentKanbanBoardRepository"

const KanbanBoard = () => {
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

  const toggleAssignUserModal = task => {
    setTask(task)
    setShowAssignUserModal(!showAssignUserModal)
  }

  const handleGenerateBoardButtonClick = () => {
    boardGenerator.generate()
    setColumns(boardRepository.getColumns())

    setToastMessage("Kanban Board is successfully generated")
    setShowToast(true)
  }

  const handleConfirmCreateColumn = (title, description) => {
    boardRepository.createColumn(title, description)
    setShowColumnModal(!showColumnModal)

    setToastMessage("New column is successfully created")
    setShowToast(true)
  }

  const handleConfirmClearBoard = () => {
    boardRepository.deleteAllColumns()
    setColumns([])
    setShowClearBoardModal(!showClearBoardModal)

    setToastMessage("Kanban Board is successfully cleared")
    setShowToast(true)
  }

  const handleConfirmCreateTask = (title, description) => {
    boardRepository.createTask(columnId, title, description)
    setShowAddTaskModal(!showAddTaskModal)
    setColumns(boardRepository.getColumns())

    setToastMessage("New task is successfully created")
    setShowToast(true)
  }

  const handleConfirmEditTask = task => {
    boardRepository.updateTask(task, columnId)
    setShowEditTaskModal(!showEditTaskModal)
    setColumns(boardRepository.getColumns())

    setToastMessage("Task is successfully edited")
    setShowToast(true)
  }

  const handleDeleteColumn = columnId => {
    boardRepository.deleteColumn(columnId)
    setColumns(boardRepository.getColumns())

    setToastMessage("Column is successfully deleted")
    setShowToast(true)
  }

  const handleDeleteTask = (taskId, columnId) => {
    boardRepository.deleteTask(taskId, columnId)
    setColumns(boardRepository.getColumns())

    setToastMessage("Task is successfully deleted")
    setShowToast(true)
  }

  const handleDeleteAllTasksForColumn = columnId => {
    boardRepository.deleteAllTasksForColumn(columnId)
    setColumns(boardRepository.getColumns())

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

      setToastMessage("Task is successfully moved")
      setShowToast(true)
    }
  }

  useEffect(() => {
    setColumns(boardRepository.getColumns())
  }, [showColumnModal])

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="row">
        <div className="col-md-12">
          <ToastContainer position="top-center">
            <Toast show={showToast} title="Kanban Board" body={toastMessage} onClose={() => setShowToast(false)} />
          </ToastContainer>

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
                  onDeleteColumn={handleDeleteColumn}
                  onAddTask={toggleAddTaskModal}
                  onEditTask={toggleEditTaskModal}
                  onDeleteTask={handleDeleteTask}
                  onDeleteAllTasks={handleDeleteAllTasksForColumn}
                  onAssignUser={toggleAssignUserModal}
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