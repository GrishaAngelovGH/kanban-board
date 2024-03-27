import { render } from "@testing-library/react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Column from "./Column"


jest.mock('persistent/persistentUserRepository')

test("should render Column component", () => {
  const view = render(
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Column
              title="Column Title"
              description="Column Description"
              limit={0}
              tasks={[
                { id: 1, title: "Task 1", description: "Description 1", assignedIds: [], priority: "medium", isLocked: false },
                { id: 2, title: "Task 2", description: "Description 2", assignedIds: [], priority: "medium", isLocked: false }
              ]}
              columnHandlers={{
                onDeleteColumn: () => { },
                onAddTask: () => { },
                onEditTask: () => { },
                onDeleteTask: () => { },
                onDeleteAllTasks: () => { },
                onAssignUser: () => { },
                onToggleTaskLock: () => { },
                onMarkColumnAsDone: () => { },
                onSetColumnLimit: () => { },
                onColumnUpdate: () => { }
              }}
            />
          }
        />
      </Routes>
    </Router>
  )

  expect(view).toMatchSnapshot()
})