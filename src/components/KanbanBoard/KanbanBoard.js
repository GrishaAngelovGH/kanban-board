import { useState, useEffect } from "react"


import ColumnModal from "./ColumnModal"
import ButtonPanel from "./ButtonPanel"

import persistentKanbanBoardRepostory from "persistent/persistentKanbanBoardRepostory"

import "./KanbanBoard.css"

const KanbanBoard = () => {
  const [showColumnModal, setShowColumnModal] = useState(false)
  const [columns, setColumns] = useState([])

  const toggleColumnModal = () => {
    setShowColumnModal(!showColumnModal)
  }

  const handleConfirm = (title, description) => {
    persistentKanbanBoardRepostory.createColumn(title, description)
    setShowColumnModal(!showColumnModal)
  }

  useEffect(() => {
    setColumns(persistentKanbanBoardRepostory.getColumns())
  }, [showColumnModal])

  return (
    <div className="row">
      <div className="col-md-12">
        {
          columns.map((v, i) => (
            <div key={i}>
              <h1>{v.title}</h1>
              <h3>{v.description}</h3>
            </div>
          ))
        }

        {
          showColumnModal && (
            <ColumnModal
              show={showColumnModal}
              onClose={toggleColumnModal}
              onConfirm={handleConfirm}
            />
          )
        }

        <ButtonPanel onColumnButtonClick={toggleColumnModal} />
      </div>
    </div>
  )
}

export default KanbanBoard