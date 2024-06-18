import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"

import Menu from "../Menu"

import EditableText from "components/EditableText"
import NavigationButtons from "components/KanbanBoard/NavigationButtons"

const Header = ({
  id, title, limit, tasks, handlers,
  statuses: { markedAsDone, isGridView, isSingleRowView, hasNoBackground, hasSolidColumnStyle }
}) => {
  const handleAddTask = () => {
    handlers.onAddTask(id)
  }

  const handleMarkAsDone = () => {
    handlers.onMarkColumnAsDone(id)
  }

  const handleDeleteAction = () => {
    handlers.onDeleteColumn(id)
  }

  const handleDeleteAllTasks = () => {
    handlers.onDeleteAllTasks(id)
  }

  const handleShowLimit = () => {
    handlers.setShowLimit(true)
  }

  const handleAutoAssignUsers = () => {
    handlers.onAutoAssignUser(id)
  }

  const handleSwapToLeft = () => {
    handlers.onSwapColumn(id, true)
  }

  const handleSwapToRight = () => {
    handlers.onSwapColumn(id, false)
  }

  const titleClass = hasSolidColumnStyle || hasNoBackground ? "text-dark" : "text-white"
  const checkButtonClass = hasSolidColumnStyle ? "secondary-subtle" : "light"
  const taskLengthButtonClass = hasSolidColumnStyle ? "secondary" : "light"

  return (
    <div className="row">
      <div className={`${isGridView || isSingleRowView ? "col-7 col-lg-8" : "col-10"}`}>
        <NavigationButtons
          size="sm"
          className="mb-2"
          onLeftClick={handleSwapToLeft}
          onRightClick={handleSwapToRight}
        />

        <EditableText onBlur={handlers.handleUpdate}>
          <h3 className={`${titleClass} text-break text-capitalize`}>{title}</h3>
        </EditableText>

        <h3 className={titleClass}>{limit > 0 && `(${tasks.length} / ${limit})`}</h3>
      </div>
      <div className={`${isGridView || isSingleRowView ? "col-5 col-lg-4" : "col-2"}`}>
        <ButtonGroup size="sm">
          {markedAsDone && <Button variant={checkButtonClass} className="bi bi-check-circle-fill text-success" disabled />}

          <Button variant={taskLengthButtonClass} disabled>{tasks.length}</Button>

          <Menu
            markedAsDone={markedAsDone}
            handleAddTask={handleAddTask}
            handleMarkAsDone={handleMarkAsDone}
            handleDeleteAction={handleDeleteAction}
            handleDeleteAllTasks={handleDeleteAllTasks}
            handleShowLimit={handleShowLimit}
            handleAutoAssignUsers={handleAutoAssignUsers}
          />
        </ButtonGroup>
      </div>
    </div>
  )
}

export default Header