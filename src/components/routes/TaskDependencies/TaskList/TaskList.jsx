import Badge from "react-bootstrap/Badge"
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"

import boardRepository from "persistent/persistentKanbanBoardRepository"

const TaskList = ({ taskId, columnId, columns, showToastWithMessage }) => (
  <ListGroup>
    <ListGroup.Item className="bg-secondary-subtle text-secondary fw-bold text-center">
      All columns with tasks
    </ListGroup.Item>
    {
      columns
        .filter(col => !col.markedAsDone && !col.items.every(v => boardRepository.isDependencyTask(v.id)))
        .map(col => (
          <ListGroup.Item key={col.id}>
            <Badge className="mb-3">{col.title}</Badge>
            {
              col.items.map(v => (
                <div key={v.id}>
                  {
                    !boardRepository.isDependencyTask(v.id) && (
                      <ListGroup.Item className="border border-3 rounded mb-3">
                        <p>{v.title}</p>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="w-100"
                          disabled={v.id === taskId}
                          onClick={(() => {
                            boardRepository.addDependencyTask(taskId, columnId, v.id, col.id)
                            showToastWithMessage("The dependency task is successfully added")
                          })}
                        >
                          Add as a dependency
                        </Button>
                      </ListGroup.Item>
                    )
                  }
                </div>
              ))
            }
          </ListGroup.Item>
        ))
    }
  </ListGroup>
)

export default TaskList