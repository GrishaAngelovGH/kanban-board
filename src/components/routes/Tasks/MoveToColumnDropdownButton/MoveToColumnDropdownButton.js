import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const MoveToColumnDropdownButton = ({ columns, column, taskId, setShowToast, setToastMessage, setActiveKey }) => {
  const handleChangeColumnButtonClick = ({ target }) => {
    boardRepository.moveTask(column.id, target.id, taskId)
    setToastMessage(`The task is successfully moved to ${target.name}`)
    setShowToast(true)
    setActiveKey("")
  }

  return (
    <DropdownButton className="dropdown-menu-header" as={ButtonGroup} size="sm" variant="primary" title="Move to other column">
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