import { Link } from "react-router-dom"

import Accordion from "react-bootstrap/Accordion"
import Badge from "react-bootstrap/Badge"
import Task from "./Task"

import useBackgroundImage from "hooks/useBackgroundImage"

import history from "persistent/history"

const History = ({ showToastWithMessage }) => {
  const backgroundImage = useBackgroundImage()
  const columns = history.getColumns()

  return (
    <div className="row g-0 vh-100" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none", backgroundSize: "cover" }}>
      <div className="col-12">
        <div className="row g-0 bg-light p-2 shadow align-items-center">
          <div className="col-2">
            <Link to="/" className="btn btn-light bi bi-arrow-left border"></Link>
          </div>
          <div className="col-8">
            <h3 className="m-0 text-center">History</h3>
          </div>
        </div>

        <div className="row g-0 mt-3 justify-content-center overflow-auto tasks">
          <div className="col-10">
            <Accordion>
              {
                columns.map((column, i) => (
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
                          <Task
                            key={v.id}
                            {...v}
                            column={column}
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

export default History