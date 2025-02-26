import { render } from "@testing-library/react"
import { vi, afterEach } from "vitest"

import KanbanBoard from "./KanbanBoard"

window.URL.createObjectURL = vi.fn()

afterEach(() => {
  window.URL.createObjectURL.mockReset()
})

test("should render KanbanBoard route component", () => {
  const view = render(<KanbanBoard />)

  expect(view).toMatchSnapshot()
})