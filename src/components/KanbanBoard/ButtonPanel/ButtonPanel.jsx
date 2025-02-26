import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

import "./ButtonPanel.css"

const ButtonPanel = ({ onColumnButtonClick, onClearBoardButtonClick, onDeleteEmptyColumnsButtonClick, onGenerateBoardButtonClick }) => (
  <div className="row border-top border-secondary-subtle fixed-bottom p-2 justify-content-end text-end button-panel">
    <div className="col-md-5 col-lg-3">
      <ButtonGroup>
        <Button
          variant="primary"
          className="bi bi-magic"
          onClick={onGenerateBoardButtonClick}
        />
        <Button
          variant="primary"
          onClick={onColumnButtonClick}
        >
          New Column
        </Button>
        <DropdownButton as={ButtonGroup} variant="danger" title="Clear Board">
          <Dropdown.Item onClick={onClearBoardButtonClick}>
            All columns
          </Dropdown.Item>
          <Dropdown.Item onClick={onDeleteEmptyColumnsButtonClick}>
            All empty columns
          </Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </div>
  </div>
)

export default ButtonPanel