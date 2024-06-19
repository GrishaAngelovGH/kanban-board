import Accordion from "react-bootstrap/Accordion"
import Badge from "react-bootstrap/Badge"
import Button from "react-bootstrap/Button"

import Page from "components/routes/Page"

import Task from "./Task"

import history from "persistent/history"

const History = ({ showToastWithMessage }) => {
  const columns = history.getColumns()

  const buttons = [
    {
      variant: "primary",
      className: "me-2",
      label: "Restore column",
      onClick: id => {
        history.restoreColumn(id)
        showToastWithMessage("The column is successfully restored")
      }
    },
    {
      variant: "danger",
      className: "",
      label: "Delete column",
      onClick: id => {
        history.deleteColumn(id)
        showToastWithMessage("The column is successfully deleted")
      }
    }
  ]

  const description = (
    <div className="col-10">
      <h3 className="m-0 text-center">History</h3>
    </div>
  )

  return (
    <Page description={description}>
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
                      buttons.map((v, i) => (
                        <Button
                          key={i}
                          variant={v.variant}
                          className={v.className}
                          onClick={() => {
                            v.onClick(column.id)
                          }}
                        >
                          {v.label}
                        </Button>
                      ))
                    }
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
    </Page>
  )
}

export default History