import { useState, useEffect } from "react"
import { DndContext } from "@dnd-kit/core"

import ButtonPanel from "./ButtonPanel"
import Column from "./Column"
import EmptyBoard from "./EmptyBoard"

import ClearBoardModal from "./modals/ClearBoardModal"
import ColumnModal from "./modals/ColumnModal"
import NewTaskModal from "./modals/TaskModals/NewTaskModal"

import boardGenerator from "persistent/persistentKanbanBoardGenerator"
import boardRepository from "persistent/persistentKanbanBoardRepository"

const KanbanBoard = () => {
  const [showColumnModal, setShowColumnModal] = useState(false)
  const [showClearBoardModal, setShowClearBoardModal] = useState(false)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [columnId, setColumnId] = useState("")
  const [columns, setColumns] = useState([])

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

  const handleGenerateBoardButtonClick = () => {
    boardGenerator.generate()
    setColumns(boardRepository.getColumns())
  }

  const handleConfirmCreateColumn = (title, description) => {
    boardRepository.createColumn(title, description)
    setShowColumnModal(!showColumnModal)
  }

  const handleConfirmClearBoard = () => {
    boardRepository.deleteAllColumns()
    setColumns([])
    setShowClearBoardModal(!showClearBoardModal)
  }

  const handleConfirmCreateTask = (title, description) => {
    boardRepository.createTask(columnId, title, description)
    setShowAddTaskModal(!showAddTaskModal)
    setColumns(boardRepository.getColumns())
  }

  const handleDeleteColumn = columnId => {
    boardRepository.deleteColumn(columnId)
    setColumns(boardRepository.getColumns())
  }

  const handleDeleteTask = (taskTitle, columnTitle) => {
    boardRepository.deleteTask(taskTitle, columnTitle)
    setColumns(boardRepository.getColumns())
  }

  const handleDeleteAllTasksForColumn = columnId => {
    boardRepository.deleteAllTasksForColumn(columnId)
    setColumns(boardRepository.getColumns())
  }

  const handleDragEnd = ({ active: { id, data: { current: { columnId } } }, over }) => {
    if (over) {
      const fromColumnId = columnId
      const toColumnId = over.id
      const taskId = id

      boardRepository.moveTask(fromColumnId, toColumnId, taskId)
      setColumns(boardRepository.getColumns())
    }
  }

  useEffect(() => {
    setColumns(boardRepository.getColumns())
  }, [showColumnModal])

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="row">
        <div className="col-md-12">
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
                  onDeleteTask={handleDeleteTask}
                  onDeleteAllTasks={handleDeleteAllTasksForColumn}
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
            onClose={toggleAddTaskModal}
            onConfirm={handleConfirmCreateTask}
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