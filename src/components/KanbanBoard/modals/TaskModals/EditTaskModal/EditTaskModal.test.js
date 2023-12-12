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

test("should render EditTaskModal component with template task", () => {
  const task = {
    title: "",
    description: "Template Description",
    isTemplate: true
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