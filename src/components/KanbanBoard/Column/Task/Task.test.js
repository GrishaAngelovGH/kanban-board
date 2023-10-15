import { render } from "@testing-library/react"

import Task from "./Task"

test("should render Task component", () => {
  const view = render(<Task title="Task Title" description="Task Description" />)

  expect(view).toMatchSnapshot()
})