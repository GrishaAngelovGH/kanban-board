import { render } from "@testing-library/react"

import KanbanBoard from "./KanbanBoard"

test("should render KanbanBoard component", () => {
  const view = render(<KanbanBoard />)

  expect(view).toMatchSnapshot()
})