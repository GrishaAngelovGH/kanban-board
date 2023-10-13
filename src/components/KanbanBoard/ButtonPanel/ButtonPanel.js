import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"

import "./ButtonPanel.css"

const ButtonPanel = ({ onColumnButtonClick, onClearBoardButtonClick }) => (
  <div className="row border-top border-secondary-subtle fixed-bottom p-2 justify-content-end text-end button-panel">
    <div className="col col-md-4 col-lg-3">
      <ButtonGroup>
        <Button
          variant="primary"
          onClick={onColumnButtonClick}
        >
          New Column
        </Button>
        <Button
          variant="danger"
          onClick={onClearBoardButtonClick}
        >
          Clear Board
        </Button>
      </ButtonGroup>
    </div>
  </div>
)

export default ButtonPanel