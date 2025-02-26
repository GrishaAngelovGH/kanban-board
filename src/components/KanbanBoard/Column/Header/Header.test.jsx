import { render } from "@testing-library/react"

import Header from "./Header"

test("should render Column/Header component", () => {
  const view = render(
    <Header
      tasks={[
        { id: 1, title: "Task 1", description: "Description 1", assignedIds: [], dependencyTasksIds: [], priority: "medium", isLocked: false },
        { id: 2, title: "Task 2", description: "Description 2", assignedIds: [], dependencyTasksIds: [], priority: "medium", isLocked: false }
      ]}
      statuses={{
        markedAsDone: false,
        isGridView: true,
        isSingleRowView: false,
        hasNoBackground: false,
        hasSolidColumnStyle: false
      }}
      handlers={{ onColumnUpdate: () => { } }}
    />
  )

  expect(view).toMatchSnapshot()
})
