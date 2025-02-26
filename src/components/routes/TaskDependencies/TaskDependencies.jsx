import Page from "components/routes/Page"
import TaskList from "./TaskList"
import DependencyList from "./DependencyList"

import boardRepository from "persistent/persistentKanbanBoardRepository"

import "./TaskDependencies.css"

const TaskDependencies = ({ taskId, columnId, showToastWithMessage }) => {
  const columns = boardRepository.getColumns()
  const column = columns.find(v => v.id === columnId)
  const task = boardRepository.getTaskById(column, taskId)

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
            <DependencyList
              columnId={columnId}
              taskId={taskId}
              showToastWithMessage={showToastWithMessage}
            />
          </div>
        </div>
      </>
    </Page>
  )
}

export default TaskDependencies