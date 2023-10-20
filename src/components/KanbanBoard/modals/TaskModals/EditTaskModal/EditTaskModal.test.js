import { render } from "@testing-library/react"

import EditTaskModal from "./EditTaskModal"

test("should render EditTaskModal component", () => {
  const view = render(
    <EditTaskModal
      show
      task={{ title: "Task Title", description: "Task Description" }}
      columnId="columnId"
    />
  )

  expect(view).toMatchSnapshot()
})