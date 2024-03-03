import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const MoveToColumnDropdownButton = ({ columns, column, taskId, showToastWithMessage, setActiveKey, disabled }) => {
  const handleChangeColumnButtonClick = ({ target }) => {
    boardRepository.moveTask(column.id, target.id, taskId)
    showToastWithMessage(`The task is successfully moved to ${target.name}`)
    setActiveKey("")
  }

  return (
    <DropdownButton
      as={ButtonGroup}
      size="sm"
      className="dropdown-menu-header"
      variant="primary"
      disabled={disabled}
      title="Move to other column"
    >
      {
        columns
          .filter(col => col.title !== column.title)
          .map(v => (
            <Dropdown.Item key={v.id} id={v.id} name={v.title} onClick={handleChangeColumnButtonClick}>
              <span className="mx-2 pe-none">{v.title}</span>
            </Dropdown.Item>
          ))
      }
    </DropdownButton>
  )
}

export default MoveToColumnDropdownButton