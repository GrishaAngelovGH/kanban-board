import { render } from "@testing-library/react"

import KanbanBoard from "./KanbanBoard"

window.URL.createObjectURL = jest.fn()

afterEach(() => {
  window.URL.createObjectURL.mockReset()
})

test("should render KanbanBoard route component", () => {
  const view = render(<KanbanBoard />)

  expect(view).toMatchSnapshot()
})