import { render } from "@testing-library/react"
import { vi } from "vitest"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import History from "./History"

vi.mock("persistent/history")

test("should render History route component", () => {
  const view = render(
    <Router>
      <Routes>
        <Route path="/" element={<History />} />
      </Routes>
    </Router>
  )

  expect(view).toMatchSnapshot()
})