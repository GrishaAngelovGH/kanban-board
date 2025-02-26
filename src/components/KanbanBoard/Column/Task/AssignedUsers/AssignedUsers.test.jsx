import { render } from "@testing-library/react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import AssignedUsers from "./AssignedUsers"

jest.mock('persistent/persistentUserRepository')

test("should render Task/AssignedUsers component", () => {
  const view = render(
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AssignedUsers ids={{ assignedIds: [1, 2] }} />
          }
        />
      </Routes>
    </Router>
  )

  expect(view).toMatchSnapshot()
})