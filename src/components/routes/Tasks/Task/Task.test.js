import { render } from "@testing-library/react"

import Task from "./Task"

jest.mock('persistent/persistentKanbanBoardRepository')

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