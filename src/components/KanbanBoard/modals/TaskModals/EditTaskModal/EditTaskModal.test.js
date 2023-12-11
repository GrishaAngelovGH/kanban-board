import { render } from "@testing-library/react"

import EditTaskModal from "./EditTaskModal"

test("should render EditTaskModal component", () => {
  const task = {
    title: "Task Title",
    description: "Task Description",
    isTemplate: false
  }

  const view = render(
    <EditTaskModal
      show
      task={task}
      columnId="columnId"
    />
  )

  expect(view).toMatchSnapshot()
})