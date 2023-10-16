import { useState, useEffect } from "react"

import ButtonPanel from "./ButtonPanel"
import Column from "./Column"

import ClearBoardModal from "./modals/ClearBoardModal"
import ColumnModal from "./modals/ColumnModal"
import TaskModal from "./modals/TaskModal"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const KanbanBoard = () => {
  const [showColumnModal, setShowColumnModal] = useState(false)
  const [showClearBoardModal, setShowClearBoardModal] = useState(false)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [columnName, setColumnName] = useState("")
  const [columns, setColumns] = useState([])

  const toggleColumnModal = () => {
    setShowColumnModal(!showColumnModal)
  }

  const toggleClearBoardModal = () => {
    setShowClearBoardModal(!showClearBoardModal)
  }

  const toggleAddTaskModal = columnName => {
    setColumnName(columnName)
    setShowAddTaskModal(!showAddTaskModal)
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
    boardRepository.createTask(columnName, title, description)
    setShowAddTaskModal(!showAddTaskModal)
  }

  const handleDeleteColumn = title => {
    boardRepository.deleteColumn(title)
    setColumns(boardRepository.getColumns())
  }

  const handleDeleteAllTasksForColumn = title => {
    boardRepository.deleteAllTasksForColumn(title)
    setColumns(boardRepository.getColumns())
  }

  useEffect(() => {
    setColumns(boardRepository.getColumns())
  }, [showColumnModal])

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row p-5">
          {
            columns.map((v, i) => {
              const tasks = boardRepository.getTasksForColumn(v.title)

              return (
                <Column
                  key={i}
                  title={v.title}
                  description={v.description}
                  tasks={tasks}
                  onDeleteColumn={handleDeleteColumn}
                  onAddTask={toggleAddTaskModal}
                  onDeleteAllTasks={handleDeleteAllTasksForColumn}
                />
              )
            })
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

        <TaskModal
          show={showAddTaskModal}
          onClose={toggleAddTaskModal}
          onConfirm={handleConfirmCreateTask}
        />

        <ButtonPanel
          onColumnButtonClick={toggleColumnModal}
          onClearBoardButtonClick={toggleClearBoardModal}
        />
      </div>
    </div>
  )
}

export default KanbanBoard