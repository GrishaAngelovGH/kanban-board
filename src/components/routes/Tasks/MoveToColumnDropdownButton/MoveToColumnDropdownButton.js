import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const MoveToColumnDropdownButton = ({ column, task: { taskId, isLocked }, showToastWithMessage, setActiveKey }) => {
  const handleChangeColumnButtonClick = ({ target }) => {
    const success = boardRepository.moveTask(column.id, target.id, taskId)
    success ?
      showToastWithMessage(`The task is successfully moved to ${target.name}`) :
      showToastWithMessage("Tasks can only be moved to the 'done' column when all their dependencies are resolved.")

    setActiveKey("")
  }

  const columns = boardRepository.getColumns()
  const filteredColumns = columns.filter(col => col.title !== column.title)

  return (
    <DropdownButton
      as={ButtonGroup}
      size="sm"
      className="dropdown-menu-header"
      variant="primary"
      disabled={isLocked || !filteredColumns.length}
      title="Move to other column"
    >
      {
        filteredColumns.map(v => (
          <Dropdown.Item key={v.id} id={v.id} name={v.title} onClick={handleChangeColumnButtonClick}>
            <span className="mx-2 pe-none">{v.title}</span>
          </Dropdown.Item>
        ))
      }
    </DropdownButton>
  )
}

export default MoveToColumnDropdownButton