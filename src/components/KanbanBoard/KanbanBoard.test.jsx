import { render } from "@testing-library/react"
import { vi } from "vitest"

import KanbanBoard from "./KanbanBoard"

test("should render KanbanBoard component", () => {
  const onUpdate = vi.fn()

  const view = render(<KanbanBoard onUpdate={onUpdate} />)

  expect(view).toMatchSnapshot()
})