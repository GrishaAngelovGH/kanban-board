import { Link } from "react-router-dom"

import Badge from "react-bootstrap/Badge"
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"

import boardRepository from "persistent/persistentKanbanBoardRepository"

import useBackgroundImage from "hooks/useBackgroundImage"

import "./TaskDependencies.css"

const TaskDependencies = ({ taskId, columnId }) => {
  const backgroundImage = useBackgroundImage()
  const columns = boardRepository.getColumns()
  const column = columns.find(v => v.id === columnId)
  const task = boardRepository.getTaskById(column, taskId)

  return (
    <div className="row g-0 vh-100" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none", backgroundSize: "cover" }}>
      <div className="col-12">
        <div className="row g-0 bg-light p-2 shadow align-items-center">
          <div className="col-2">
            <Link to="/" className="btn btn-light bi bi-arrow-left border"></Link>
          </div>
          <div className="col-8">
            <h3 className="m-0 text-center">Task Dependencies</h3>
          </div>
        </div>

        <div className="row g-0 mt-3 justify-content-center">
          <div className="col-6 bg-light rounded">
            <h3 className="m-0 text-center">{task.title}</h3>
          </div>
        </div>

        <div className="row g-0 mt-3 justify-content-around overflow-auto task-dependencies">
          <div className="col-4">
            <ListGroup>
              <ListGroup.Item className="bg-secondary-subtle text-secondary fw-bold text-center">
                All columns with tasks
              </ListGroup.Item>
              {
                columns
                  .filter(col => col.items.length)
                  .map(col => (
                    <ListGroup.Item key={col.id}>
                      <Badge className="mb-3">{col.title}</Badge>
                      {
                        col.items.map(v => (
                          <ListGroup.Item key={v.id} className="border border-3 rounded mb-3">
                            <p>{v.title}</p>
                            <Button
                              size="sm"
                              variant="outline-primary"
                              className="w-100"
                              disabled={v.id === taskId}
                              onClick={(() => {
                                boardRepository.addDependencyTask(taskId, columnId, v.id)
                              })}
                            >
                              Add as a dependency
                            </Button>
                          </ListGroup.Item>
                        ))
                      }
                    </ListGroup.Item>
                  ))
              }
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDependencies