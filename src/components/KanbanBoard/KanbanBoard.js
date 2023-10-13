import { useState, useEffect } from "react"

import ButtonPanel from "./ButtonPanel"
import Column from "./Column"
import ColumnModal from "./ColumnModal"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const KanbanBoard = () => {
  const [showColumnModal, setShowColumnModal] = useState(false)
  const [columns, setColumns] = useState([])

  const toggleColumnModal = () => {
    setShowColumnModal(!showColumnModal)
  }

  const handleConfirm = (title, description) => {
    boardRepository.createColumn(title, description)
    setShowColumnModal(!showColumnModal)
  }

  const handleDeleteColumn = title => {
    boardRepository.deleteColumn(title)
    setColumns(boardRepository.getColumns())
  }

  const handleClearBoard = () => {
    boardRepository.deleteAllColumns()
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
              onConfirm={handleConfirm}
            />
          )
        }

        <ButtonPanel
          onColumnButtonClick={toggleColumnModal}
          onClearBoardButtonClick={handleClearBoard}
        />
      </div>
    </div>
  )
}

export default KanbanBoard