import { render } from "@testing-library/react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import TaskDependencies from "./TaskDependencies"

jest.mock('persistent/persistentKanbanBoardRepository')

test("should render TaskDependencies route component", () => {
  const view = render(
    <Router>
      <Routes>
        <Route path="/" element={<TaskDependencies taskId="3792131195588513" />} />
      </Routes>
    </Router>
  )

  expect(view).toMatchSnapshot()
})