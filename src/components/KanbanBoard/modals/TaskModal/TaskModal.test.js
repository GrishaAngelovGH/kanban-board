import { render } from "@testing-library/react"

import TaskModal from "./TaskModal"

test("should render TaskModal component", () => {
  const view = render(<TaskModal show />)

  expect(view).toMatchSnapshot()
})