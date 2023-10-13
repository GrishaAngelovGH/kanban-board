import { useState, useEffect } from "react"

import ButtonPanel from "./ButtonPanel"
import Column from "./Column"
import ColumnModal from "./ColumnModal"

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

  const handleDeleteColumn = title => {
    persistentKanbanBoardRepostory.deleteColumn(title)
    setColumns(persistentKanbanBoardRepostory.getColumns())
  }

  useEffect(() => {
    setColumns(persistentKanbanBoardRepostory.getColumns())
  }, [showColumnModal])

  return (
    <div className="row">
      <div className="col-md-12">

        <div className="row justify-content-around p-5">
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

        <ButtonPanel onColumnButtonClick={toggleColumnModal} />
      </div>
    </div>
  )
}

export default KanbanBoard