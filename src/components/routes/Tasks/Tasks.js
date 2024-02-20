import { useState } from "react"
import { Link } from "react-router-dom"

import boardRepository from "persistent/persistentKanbanBoardRepository"
import userRepository from "persistent/persistentUserRepository"

import useBackgroundImage from "hooks/useBackgroundImage"

import Toast from "components/Toast"
import MoveToColumnDropdownButton from "./MoveToColumnDropdownButton"

import Accordion from "react-bootstrap/Accordion"
import Badge from "react-bootstrap/Badge"
import ToastContainer from "react-bootstrap/ToastContainer"
import Avatar from "components/Avatar"

import "./Tasks.css"

const Tasks = ({ userId }) => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [activeKey, setActiveKey] = useState("")

  const backgroundImage = useBackgroundImage()
  const user = userRepository.findUserById(userId)

  const relevantColumns = boardRepository.getColumnsWithAssignedTasksForUser(user.id)
  const allColumns = boardRepository.getColumns()

  return (
    <div className="row g-0 vh-100" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none", backgroundSize: "cover" }}>
      <div className="col-12">
        <div className="row g-0 bg-light p-2 shadow align-items-center">
          <div className="col-1">
            <Link to="/" className="btn btn-light bi bi-arrow-left border"></Link>
          </div>
          <div className="col-10">
            <h3 className="m-0 text-center">Tasks assigned to {user.name}</h3>
            <p className="text-secondary text-center">Click on any item to expand/collapse its content</p>
          </div>
          <div className="col-1">
            <Avatar user={user} size={80}></Avatar>
          </div>
        </div>

        <div className="row g-0 mt-3 justify-content-center">
          <div className="col-10">
            <Accordion activeKey={activeKey} onSelect={setActiveKey}>
              {
                relevantColumns.map((column, i) => (
                  <Accordion.Item key={column.id} eventKey={`${i}`}>
                    <Accordion.Header>
                      <h3>
                        {column.title}
                        <Badge bg="primary ms-2">
                          {column.items.length}
                        </Badge>
                      </h3>
                      <p>{column.description}</p>
                    </Accordion.Header>
                    <Accordion.Body>
                      {
                        column.items.map(v => (
                          <div key={v.id} className="mt-3 border border-3 shadow rounded p-3 bg-light">
                            <h3>{v.title}</h3>
                            <p>{v.description}</p>
                            {
                              v.priority.length > 0 && (
                                <p className="text-capitalize">Priority: {v.priority}</p>
                              )
                            }
                            <MoveToColumnDropdownButton
                              columns={allColumns}
                              column={column}
                              taskId={v.id}
                              setShowToast={setShowToast}
                              setToastMessage={setToastMessage}
                              setActiveKey={setActiveKey}
                            />
                          </div>
                        ))
                      }
                    </Accordion.Body>
                  </Accordion.Item>
                ))
              }
            </Accordion>

            <ToastContainer position="top-center">
              <Toast show={showToast} title="Kanban Board" body={toastMessage} onClose={() => setShowToast(false)} />
            </ToastContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks