import { Fragment } from "react"

import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const FilterMenu = ({ onUpdate }) => {
  const filters = [
    {
      category: "Filter by priority",
      items: ["All", "Low", "Medium", "High"],
      onClick: ({ target: { innerText } }) => {
        boardRepository.applyPriorityFilter(innerText)
        onUpdate()
      }
    }
  ]

  const priority = boardRepository.getPriorityFilter()
  const variant = priority ? "success" : "light"

  return (
    <DropdownButton as={ButtonGroup} size="sm" variant={variant} title={<i className="bi bi-filter"></i>}>
      {
        filters.map((v, i) => (
          <Fragment key={i}>
            <Dropdown.ItemText className="bg-secondary-subtle text-secondary border text-center">{v.category}</Dropdown.ItemText>
            {
              v.items.map((item, j) => (
                <Dropdown.Item key={j} onClick={v.onClick} >
                  {item} {item === priority && <i className="bi bi-check-circle-fill text-primary fs-5 ms-2"></i>}
                </Dropdown.Item>
              ))
            }
          </Fragment>
        ))
      }
    </DropdownButton>
  )
}

export default FilterMenu