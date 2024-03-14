import { render } from "@testing-library/react"

import Task from "./Task"

test("should render History/Task component", () => {
  const view = render(
    <Task
      title="Task Title"
      description="Task Description"
      priority="medium"
    />
  )

  expect(view).toMatchSnapshot()
})