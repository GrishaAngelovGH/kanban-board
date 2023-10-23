import { render } from "@testing-library/react"

import AssignUserModal from "./AssignUserModal"

test("should render AssignUserModal component", () => {
  const view = render(<AssignUserModal show />)

  expect(view).toMatchSnapshot()
})