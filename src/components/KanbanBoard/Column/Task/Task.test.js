import { render } from "@testing-library/react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Task from "./Task"

jest.mock('persistent/persistentUserRepository')

const handlers = {
  onEdit: () => { },
  onAssignUser: () => { },
  onToggleLock: () => { },
  onDelete: () => { }
}

test("should render Task component", () => {
  const view = render(
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Task
              id="taskId"
              columnId="columnId"
              title="Task Title"
              description="Task Description"
              column="Column Title"
              assignedIds={[]}
              dependencyTasksIds={[]}
              priority="medium"
              isLocked={false}
              handlers={handlers}
            />
          }
        />
      </Routes>
    </Router>
  )

  expect(view).toMatchSnapshot()
})

test("should render Task component as a template", () => {
  const view = render(
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Task
              id="taskId"
              columnId="columnId"
              isTemplate={true}
              title=""
              description="Template Description"
              column="Column Title"
              assignedIds={[]}
              dependencyTasksIds={[]}
              priority=""
              handlers={handlers}
            />
          }
        />
      </Routes>
    </Router>
  )

  expect(view).toMatchSnapshot()
})