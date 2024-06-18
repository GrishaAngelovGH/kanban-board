import { render } from "@testing-library/react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Actions from "./Actions"

describe("should render Actions component", () => {
  test("showing the activation button", () => {
    const view = render(
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Actions
                ids={{ taskId: "taskId-1", assignedIds: [1, 2], dependencyTasksIds: [] }}
                handlers={{}}
                statuses={{ markedAsDone: false, isActive: false, hasUsers: true }}
                priority={"medium"}
              />
            }
          />
        </Routes>
      </Router>
    )

    expect(view).toMatchSnapshot()
  })

  test("showing the deactivation button", () => {
    const view = render(
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Actions
                ids={{ taskId: "taskId-1", columnId: "columnId-1", assignedIds: [1, 2], dependencyTasksIds: [] }}
                handlers={{}}
                statuses={{ markedAsDone: false, isActive: true, hasUsers: true }}
                users={[]}
                priority={"medium"}
              />
            }
          />
        </Routes>
      </Router>
    )

    expect(view).toMatchSnapshot()
  })

  test("not showing the activation/deactivation button", () => {
    const view = render(
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Actions
                ids={{ taskId: "taskId-1", columnId: "columnId-1", assignedIds: [], dependencyTasksIds: [] }}
                handlers={{}}
                statuses={{ markedAsDone: true, hasUsers: true }}
                users={[]}
                priority={"medium"}
              />
            }
          />
        </Routes>
      </Router>
    )

    expect(view).toMatchSnapshot()
  })

  test("showing the manage dependencies button", () => {
    const view = render(
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Actions
                ids={{ taskId: "taskId-1", columnId: "columnId-1", assignedIds: [1, 2], dependencyTasksIds: [3, 4] }}
                handlers={{}}
                statuses={{ markedAsDone: false, hasUsers: true }}
                users={[]}
                priority={"medium"}
              />
            }
          />
        </Routes>
      </Router>
    )

    expect(view).toMatchSnapshot()
  })

  test("not showing the delete button for locked status", () => {
    const view = render(
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Actions
                ids={{ taskId: "taskId-1", columnId: "columnId-1", assignedIds: [1, 2], dependencyTasksIds: [3, 4] }}
                handlers={{}}
                statuses={{ isLocked: true, hasUsers: true }}
                users={[]}
                priority={"medium"}
              />
            }
          />
        </Routes>
      </Router>
    )

    expect(view).toMatchSnapshot()
  })

  test("not showing the user assign button for template", () => {
    const view = render(
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Actions
                ids={{ taskId: "taskId-1", columnId: "columnId-1", assignedIds: [1, 2], dependencyTasksIds: [3, 4] }}
                handlers={{}}
                statuses={{ isTemplate: true, hasUsers: false }}
                users={[]}
                priority={"medium"}
              />
            }
          />
        </Routes>
      </Router>
    )

    expect(view).toMatchSnapshot()
  })
})