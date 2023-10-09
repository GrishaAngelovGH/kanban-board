import { useState } from "react"

import Button from "react-bootstrap/Button"

import ColumnModal from "./ColumnModal"

import "./KanbanBoard.css"

const KanbanBoard = () => {
  const [showColumnModal, setShowColumnModal] = useState(false)

  const toggleColumnModal = () => {
    setShowColumnModal(!showColumnModal)
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <Button
          variant="primary"
          className="position-fixed create-btn"
          onClick={toggleColumnModal}
        >
          New Column
        </Button>

        {
          showColumnModal && (
            <ColumnModal show={showColumnModal} onClose={toggleColumnModal} />
          )
        }
      </div>
    </div>
  )
}

export default KanbanBoard