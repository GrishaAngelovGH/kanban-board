import { render } from "@testing-library/react"

import KanbanBoard from "./KanbanBoard"

test("should render KanbanBoard component", () => {
  const onUpdate = jest.fn()

  const view = render(<KanbanBoard onUpdate={onUpdate} />)

  expect(view).toMatchSnapshot()
})