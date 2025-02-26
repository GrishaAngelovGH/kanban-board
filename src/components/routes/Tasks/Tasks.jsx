import { useState } from "react"

import Accordion from "react-bootstrap/Accordion"
import Badge from "react-bootstrap/Badge"

import Avatar from "components/Avatar"
import Page from "components/routes/Page"
import TaskProgress from "components/TaskProgress"

import Task from "./Task"

import boardRepository from "persistent/persistentKanbanBoardRepository"
import userRepository from "persistent/persistentUserRepository"

import "./Tasks.css"

const Tasks = ({ userId, showToastWithMessage }) => {
  const [activeKey, setActiveKey] = useState("")

  const user = userRepository.findUserById(userId)

  const columns = boardRepository.getColumnsWithAssignedTasksForUser(user.id)

  const description = (
    <>
      <div className="col-10 col-md-9 col-lg-10">
        <h3 className="m-0 text-center">Tasks assigned to {user.name}</h3>
        <p className="text-secondary text-center">Click on any item to expand/collapse its content</p>
      </div>
      <div className="col-1 col-md-2 col-lg-1 d-none d-md-block text-center">
        <Avatar user={user} size={80}></Avatar>
      </div>
    </>
  )

  return (
    <Page description={description}>
      <div className="row g-0 mt-3 justify-content-center overflow-auto tasks">
        <div className="col-10">
          <TaskProgress columns={columns} />

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
    </Page>
  )
}

export default Tasks