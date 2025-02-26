import { render } from "@testing-library/react"

import AssignUserModal from "./AssignUserModal"

jest.mock('persistent/persistentUserRepository')

test("should render AssignUserModal component", () => {
  const task = { id: 1, title: "Title", description: "Description", assignedIds: [] }

  const view = render(<AssignUserModal show task={task} />)

  expect(view).toMatchSnapshot()
})