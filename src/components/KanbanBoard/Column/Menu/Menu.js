import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

const Menu = ({ markedAsDone, handleAddTask, handleMarkAsDone, handleDeleteAction, handleDeleteAllTasks, handleShowLimit, handleAutoAssignUsers }) => {
  const menuItems = [
    { label: "Add Task", icon: "bi bi-plus-circle-fill text-primary mx-1", onClick: handleAddTask },
    { label: markedAsDone ? "Unmark as Done" : "Mark as Done", icon: "bi bi-check-square-fill text-success mx-1", onClick: handleMarkAsDone },
    { label: "Delete Column", icon: "bi bi-x-circle-fill text-danger mx-1", onClick: handleDeleteAction },
    { label: "Delete All Tasks", icon: "bi bi-x-circle-fill text-danger mx-1", onClick: handleDeleteAllTasks },
    { label: "Set Task Limit", icon: "bi bi-exclamation-circle-fill text-warning mx-1", onClick: handleShowLimit },
    { label: "Auto Assign Users", icon: "bi bi-star-fill text-warning mx-1", onClick: handleAutoAssignUsers }
  ]

  return (
    <DropdownButton as={ButtonGroup} size="sm" variant="light" title={<i className="bi bi-three-dots-vertical"></i>}>
      {
        menuItems.map((v, i) => (
          <Dropdown.Item key={i} onClick={v.onClick}>
            <i className={v.icon}></i>
            {v.label}
          </Dropdown.Item>
        ))
      }
    </DropdownButton>
  )
}

export default Menu