import { useState } from "react"
import { Link } from "react-router-dom"

import boardRepository from "persistent/persistentKanbanBoardRepository"
import userRepository from "persistent/persistentUserRepository"

import useBackgroundImage from "hooks/useBackgroundImage"

import Avatar from "components/Avatar"
import RichTextDescription from "components/RichTextDescription"
import Collaborators from "./Collaborators"
import MoveToColumnDropdownButton from "./MoveToColumnDropdownButton"

import Accordion from "react-bootstrap/Accordion"
import Badge from "react-bootstrap/Badge"
import Button from "react-bootstrap/Button"

import "./Tasks.css"

const Tasks = ({ userId, showToastWithMessage }) => {
  const [activeKey, setActiveKey] = useState("")

  const backgroundImage = useBackgroundImage()
  const user = userRepository.findUserById(userId)

  const relevantColumns = boardRepository.getColumnsWithAssignedTasksForUser(user.id)
  const allColumns = boardRepository.getColumns()

  return (
    <div className="row g-0 vh-100" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none", backgroundSize: "cover" }}>
      <div className="col-12">
        <div className="row g-0 bg-light p-2 shadow align-items-center">
          <div className="col-2 col-md-1">
            <Link to="/" className="btn btn-light bi bi-arrow-left border"></Link>
          </div>
          <div className="col-10 col-md-9 col-lg-10">
            <h3 className="m-0 text-center">Tasks assigned to {user.name}</h3>
            <p className="text-secondary text-center">Click on any item to expand/collapse its content</p>
          </div>
          <div className="col-1 col-md-2 col-lg-1 d-none d-md-block text-center">
            <Avatar user={user} size={80}></Avatar>
          </div>
        </div>

        <div className="row g-0 mt-3 justify-content-center">
          <div className="col-10">
            <Accordion activeKey={activeKey} onSelect={setActiveKey}>
              {
                relevantColumns.map((column, i) => (
                  <Accordion.Item key={column.id} eventKey={`${i}`}>
                    <Accordion.Header className={column.markedAsDone ? "done" : ""}>
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
                            <h3>{v.title} {v.isLocked && <i className="bi bi-lock"></i>}</h3>

                            <RichTextDescription description={v.description} className="mb-3" />

                            {
                              v.priority.length > 0 && (
                                <p className="text-capitalize">Priority: {v.priority}</p>
                              )
                            }

                            <Collaborators ids={v.assignedIds} userId={userId} />

                            <div className="task-actions">
                              <MoveToColumnDropdownButton
                                columns={allColumns}
                                column={column}
                                taskId={v.id}
                                showToastWithMessage={showToastWithMessage}
                                setActiveKey={setActiveKey}
                                disabled={v.isLocked}
                              />

                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  boardRepository.removeAssignedUserFromTask(v.id, column.id, userId)
                                  setActiveKey("")
                                  showToastWithMessage(`The user is successfully unassigned from "${v.title}" task`)
                                }}
                              >
                                Unassign Me
                              </Button>

                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  v.assignedIds.forEach(id => {
                                    id !== userId && boardRepository.removeAssignedUserFromTask(v.id, column.id, id)
                                  })

                                  setActiveKey("")
                                  showToastWithMessage(`The remaining collaborators have been successfully unassigned from task "${v.title}"`)
                                }}
                              >
                                Leave only me
                              </Button>
                            </div>
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