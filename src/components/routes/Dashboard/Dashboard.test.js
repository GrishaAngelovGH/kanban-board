import { render } from "@testing-library/react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Dashboard from "./Dashboard"

test("should render Dashboard route component", () => {
  const view = render(
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  )

  expect(view).toMatchSnapshot()
})