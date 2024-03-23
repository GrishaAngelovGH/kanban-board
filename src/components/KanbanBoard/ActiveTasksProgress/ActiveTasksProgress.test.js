import { render } from "@testing-library/react"

import ActiveTasksProgress from "./ActiveTasksProgress"

test("should render ActiveTasksProgress component", () => {
  const view = render(
    <ActiveTasksProgress
      tasks={[
        { id: 1, title: "Task 1", description: "Description 1", assignedIds: [], priority: "medium", isLocked: false, isActive: true },
        { id: 2, title: "Task 2", description: "Description 2", assignedIds: [], priority: "medium", isLocked: false }
      ]}
    />
  )

  expect(view).toMatchSnapshot()
})