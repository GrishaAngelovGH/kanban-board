import { render } from "@testing-library/react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Dashboard from "./Dashboard"

jest.mock('react-chartjs-2', () => ({ Bar: () => <div>Bar Chart</div> }))

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