import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"

import Page from "components/routes/Page"
import TaskList from "./TaskList"

import boardRepository from "persistent/persistentKanbanBoardRepository"

import "./TaskDependencies.css"

const TaskDependencies = ({ taskId, columnId, showToastWithMessage }) => {
  const columns = boardRepository.getColumns()
  const column = columns.find(v => v.id === columnId)
  const task = boardRepository.getTaskById(column, taskId)

  const dependencyTasks = boardRepository.getDependencyTasks(taskId, columnId)

  const description = (
    <div className="col-10">
      <h3 className="m-0 text-center">Task Dependencies</h3>
    </div>
  )

  return (
    <Page description={description}>
      <>
        <div className="row g-0 mt-3 justify-content-center">
          <div className="col-10 col-md-6 bg-light rounded">
            <h3 className="m-0 text-center">{task.title}</h3>
          </div>
        </div>

        <div className="row g-0 mt-3 justify-content-around overflow-auto task-dependencies">
          <div className="col-10 col-md-4">
            <TaskList
              columnId={columnId}
              taskId={taskId}
              columns={columns}
              showToastWithMessage={showToastWithMessage}
            />
          </div>
          <div className="col-10 col-md-4">
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
          </div>
        </div>
      </>
    </Page>
  )
}

export default TaskDependencies