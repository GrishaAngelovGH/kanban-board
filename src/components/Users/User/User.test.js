import { render } from "@testing-library/react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import User from "./User"

test("should render Users/User component", () => {
  const view = render(
    <Router>
      <Routes>
        <Route path="/" element={<User name="John Smith" image="img" />} />
      </Routes>
    </Router>
  )

  expect(view).toMatchSnapshot()
})