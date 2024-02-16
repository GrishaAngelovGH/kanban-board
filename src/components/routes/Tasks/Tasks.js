import { Link } from "react-router-dom"

import userRepository from "persistent/persistentUserRepository"
import boardRepository from "persistent/persistentKanbanBoardRepository"

import useBackgroundImage from "hooks/useBackgroundImage"

import Accordion from "react-bootstrap/Accordion"

import "./Tasks.css"

const Tasks = ({ userId }) => {
  const backgroundImage = useBackgroundImage()
  const user = userRepository.findUserById(userId)

  const columns = boardRepository.getColumnsWithAssignedTasksForUser(user.id)

  return (
    <div className="row g-0 vh-100" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none", backgroundSize: "cover" }}>
      <div className="col-12">
        <div className="row g-0 bg-light p-2 shadow">
          <div className="col-1">
            <Link to="/" className="btn btn-light bi bi-arrow-left border"></Link>
          </div>
          <div className="col-11">
            <h3 className="m-0 text-center">Tasks assigned to {user.name}</h3>
          </div>
        </div>

        <div className="row g-0 mt-3 justify-content-center">
          <div className="col-10">
            <Accordion>
              {
                columns.map((column, i) => (
                  <Accordion.Item key={column.id} eventKey={`${i}`}>
                    <Accordion.Header>
                      <h3>{column.title} ({column.items.length})</h3>
                      <p>{column.description}</p>
                    </Accordion.Header>
                    <Accordion.Body>
                      {
                        column.items.map(v => (
                          <div key={v.id} className="mt-3 border border-3 shadow rounded p-3">
                            <h3>{v.title}</h3>
                            <p>{v.description}</p>
                            {v.priority.length > 0 && (
                              <p className="m-0 text-capitalize">Priority: {v.priority}</p>
                            )}
                          </div>
                        ))
                      }
                    </Accordion.Body>
                  </Accordion.Item>
                ))
              }
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks