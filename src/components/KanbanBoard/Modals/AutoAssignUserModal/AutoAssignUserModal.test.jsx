import { render } from "@testing-library/react"
import { vi } from "vitest"

import AutoAssignUserModal from "./AutoAssignUserModal"

vi.mock('persistent/persistentUserRepository')

test("should render AutoAssignUserModal component", () => {
  const column = { id: 1, title: "Title", description: "Description", assignedIds: [] }

  const view = render(<AutoAssignUserModal show column={column} />)

  expect(view).toMatchSnapshot()
})