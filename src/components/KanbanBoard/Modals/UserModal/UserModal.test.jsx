import { render } from "@testing-library/react"
import { vi } from "vitest"

import UserModal from "./UserModal"

vi.mock('persistent/persistentUserRepository')

test("should render UserModal component", () => {
  const view = render(<UserModal show={true} assignedIds={[1]} title="Assign Users" />)

  expect(view).toMatchSnapshot()
})