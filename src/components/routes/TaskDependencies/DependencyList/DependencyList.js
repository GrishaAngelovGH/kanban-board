import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const DependencyList = ({ taskId, columnId, showToastWithMessage }) => {
  const dependencyTasks = boardRepository.getDependencyTasks(taskId, columnId)

  return (
    <ListGroup className="mt-3 mt-md-0">
      <ListGroup.Item className="bg-secondary-subtle text-secondary fw-bold text-center">
        Dependency tasks
      </ListGroup.Item>
      {
        dependencyTasks.map(v => (
          <ListGroup.Item key={v.id}>
            <p>{v.title}</p>
            <Button
              size="sm"
              variant="outline-danger"
              className="w-100"
              onClick={(() => {
                boardRepository.removeDependencyTask(taskId, columnId, v.id)
                showToastWithMessage("The dependency task is successfully removed")
              })}
            >
              Remove as a dependency
            </Button>
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  )
}

export default DependencyList