import { render } from "@testing-library/react"
import { vi } from "vitest"

import Task from "./Task"

vi.mock('persistent/persistentKanbanBoardRepository')

test("should render Tasks/Task component", () => {
  const view = render(
    <Task
      title="Task Title"
      description="Task Description"
      column="Column Title"
      assignedIds={[]}
      priority="medium"
      isLocked={false}
    />
  )

  expect(view).toMatchSnapshot()
})