import { render, screen, fireEvent } from "@testing-library/react"
import { vi } from "vitest"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Dashboard from "./Dashboard"

vi.mock('react-chartjs-2', () => ({
  Bar: () => <div>Bar Chart</div>
}))

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

test("should render Dashboard route component with selected card", () => {
  const view = render(
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  )

  const card = (screen.getAllByTestId("toolbar-item")).at(0)

  fireEvent.click(card)

  expect(view).toMatchSnapshot()
})