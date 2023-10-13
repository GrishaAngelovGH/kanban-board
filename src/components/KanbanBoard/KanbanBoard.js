import { useState, useEffect } from "react"

import ButtonPanel from "./ButtonPanel"
import Column from "./Column"

import ColumnModal from "./ColumnModal"
import ClearBoardModal from "./ClearBoardModal"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const KanbanBoard = () => {
  const [showColumnModal, setShowColumnModal] = useState(false)
  const [showClearBoardModal, setShowClearBoardModal] = useState(false)
  const [columns, setColumns] = useState([])

  const toggleColumnModal = () => {
    setShowColumnModal(!showColumnModal)
  }

  const toggleClearBoardModal = () => {
    setShowClearBoardModal(!showClearBoardModal)
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
                onDelete={handleDeleteColumn}
              />
            ))
          }
        </div>

        {
          showColumnModal && (
            <ColumnModal
              show={showColumnModal}
              onClose={toggleColumnModal}
              onConfirm={handleConfirmCreateColumn}
            />
          )
        }

        {
          showClearBoardModal && (
            <ClearBoardModal
              show={showClearBoardModal}
              onClose={toggleClearBoardModal}
              onConfirm={handleConfirmClearBoard}
            />
          )
        }

        <ButtonPanel
          onColumnButtonClick={toggleColumnModal}
          onClearBoardButtonClick={toggleClearBoardModal}
        />
      </div>
    </div>
  )
}

export default KanbanBoard