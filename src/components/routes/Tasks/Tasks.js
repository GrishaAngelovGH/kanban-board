import { useState } from "react"
import { Link } from "react-router-dom"

import Accordion from "react-bootstrap/Accordion"
import Badge from "react-bootstrap/Badge"

import Avatar from "components/Avatar"

import Task from "./Task"

import useBackgroundImage from "hooks/useBackgroundImage"

import boardRepository from "persistent/persistentKanbanBoardRepository"
import userRepository from "persistent/persistentUserRepository"

import "./Tasks.css"

const Tasks = ({ userId, showToastWithMessage }) => {
  const [activeKey, setActiveKey] = useState("")

  const backgroundImage = useBackgroundImage()
  const user = userRepository.findUserById(userId)

  const columns = boardRepository.getColumnsWithAssignedTasksForUser(user.id)

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
                columns.map((column, i) => (
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
                          <Task
                            key={v.id}
                            {...v}
                            userId={userId}
                            column={column}
                            setActiveKey={setActiveKey}
                            showToastWithMessage={showToastWithMessage}
                          />
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