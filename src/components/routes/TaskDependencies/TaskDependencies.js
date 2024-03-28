import { Link } from "react-router-dom"

import boardRepository from "persistent/persistentKanbanBoardRepository"

import useBackgroundImage from "hooks/useBackgroundImage"

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
      </div>
    </div>
  )
}

export default TaskDependencies