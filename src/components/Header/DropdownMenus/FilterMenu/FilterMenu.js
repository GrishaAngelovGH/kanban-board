import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import FormControl from "react-bootstrap/FormControl"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const FilterMenu = ({ onUpdate }) => {
  const handleFilterByPriority = ({ target: { innerText } }) => {
    boardRepository.applyPriorityFilter(innerText)
    onUpdate()
  }

  const handleSearch = ({ target }) => {
    boardRepository.applySearchFilter(target.value)
    onUpdate()
  }

  const handleClearFilters = () => {
    boardRepository.clearFilters()
    onUpdate()
  }


  const priority = boardRepository.getPriorityFilter()
  const searchCriteria = boardRepository.getSearchFilter() || ""
  const variant = priority || searchCriteria ? "success" : "light"

  return (
    <DropdownButton as={ButtonGroup} size="sm" variant={variant} title={<i className="bi bi-filter"></i>}>
      <Dropdown.ItemText className="bg-secondary-subtle text-secondary border text-center">Filter by priority</Dropdown.ItemText>
      {
        ["All", "Low", "Medium", "High"].map((item, i) => (
          <Dropdown.Item key={i} onClick={handleFilterByPriority} >
            {item} {item === priority && <i className="bi bi-check-circle-fill text-primary fs-5 ms-2"></i>}
          </Dropdown.Item>
        ))
      }

      <Dropdown.ItemText className="bg-secondary-subtle text-secondary border text-center">Filter by criteria</Dropdown.ItemText>
      <Dropdown.ItemText>
        <FormControl
          value={searchCriteria}
          placeholder="Search"
          className="mt-2 mb-2"
          onChange={handleSearch}
        />
      </Dropdown.ItemText>

      <Dropdown.ItemText className="bg-secondary-subtle text-secondary border text-center">Clear All Filters</Dropdown.ItemText>
      <Dropdown.Item>
        <Button variant="danger" size="sm" className="bi bi-x-circle w-100 mt-1" onClick={handleClearFilters}></Button>
      </Dropdown.Item>
    </DropdownButton>
  )
}

export default FilterMenu