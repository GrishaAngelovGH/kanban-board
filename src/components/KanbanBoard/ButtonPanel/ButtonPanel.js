import Button from "react-bootstrap/Button"

import "./ButtonPanel.css"

const ButtonPanel = ({ onColumnButtonClick }) => (
  <div className="row border-top border-secondary-subtle fixed-bottom p-2 justify-content-end text-end button-panel">
    <div className="col-md-2">
      <Button
        variant="primary"
        className="create-btn"
        onClick={onColumnButtonClick}
      >
        New Column
      </Button>
    </div>
  </div>
)

export default ButtonPanel