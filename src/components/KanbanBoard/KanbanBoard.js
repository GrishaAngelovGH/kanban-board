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
  const [columns, setColumns] = useState([])

  const toggleColumnModal = () => {
    setShowColumnModal(!showColumnModal)
  }

  const toggleClearBoardModal = () => {
    setShowClearBoardModal(!showClearBoardModal)
  }

  const toggleAddTaskModal = () => {
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

  const handleDeleteColumn = title => {
    boardRepository.deleteColumn(title)
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
            columns.map((v, i) => (
              <Column
                key={i}
                title={v.title}
                description={v.description}
                onDeleteColumn={handleDeleteColumn}
                onAddTask={toggleAddTaskModal}
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

        <TaskModal
          show={showAddTaskModal}
          onClose={toggleAddTaskModal}
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