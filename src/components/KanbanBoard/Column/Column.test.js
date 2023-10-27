import { render } from "@testing-library/react"

import Column from "./Column"

test("should render Column component", () => {
  const view = render(
    <Column
      title="Column Title"
      description="Column Description"
      tasks={[
        { id: 1, title: "Task 1", description: "Description 1", assignedIds: [] },
        { id: 2, title: "Task 2", description: "Description 2", assignedIds: [] }
      ]}
    />
  )

  expect(view).toMatchSnapshot()
})