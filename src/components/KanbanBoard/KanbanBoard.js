import Button from "react-bootstrap/Button"

import "./KanbanBoard.css"

const KanbanBoard = () => (
  <div className="row">
    <div className="col-md-12">
      <Button variant="primary" className="position-fixed create-btn">New Column</Button>
    </div>
  </div>
)

export default KanbanBoard