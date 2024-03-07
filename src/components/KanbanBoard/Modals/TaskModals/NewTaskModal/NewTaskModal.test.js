import { render } from "@testing-library/react"

import NewTaskModal from "./NewTaskModal"

test("should render NewTaskModal component", () => {
  const view = render(<NewTaskModal show />)

  expect(view).toMatchSnapshot()
})