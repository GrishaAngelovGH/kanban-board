import { render } from "@testing-library/react"

import AssignUserModal from "./AssignUserModal"

test("should render AssignUserModal component", () => {
  const view = render(<AssignUserModal show task={{ id: 1, title: "Title", description: "Description" }} />)

  expect(view).toMatchSnapshot()
})