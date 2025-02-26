import { render } from "@testing-library/react"

import AutoAssignUserModal from "./AutoAssignUserModal"

jest.mock('persistent/persistentUserRepository')

test("should render AutoAssignUserModal component", () => {
  const column = { id: 1, title: "Title", description: "Description", assignedIds: [] }

  const view = render(<AutoAssignUserModal show column={column} />)

  expect(view).toMatchSnapshot()
})