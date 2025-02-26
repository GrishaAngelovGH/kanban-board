import { render } from "@testing-library/react"
import { vi } from "vitest"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Tasks from "./Tasks"

vi.mock('persistent/persistentUserRepository')
vi.mock('persistent/persistentKanbanBoardRepository')

test("should render Tasks route component", () => {
  const view = render(
    <Router>
      <Routes>
        <Route path="/" element={<Tasks userId="1" />} />
      </Routes>
    </Router>
  )

  expect(view).toMatchSnapshot()
})