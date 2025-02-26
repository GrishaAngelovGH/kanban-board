import { render } from "@testing-library/react"
import { vi } from "vitest"

import UserList from "./UserList"

vi.mock('persistent/persistentUserRepository')

test("should render UserList component", () => {
  const onUpdate = vi.fn()

  const view = render(<UserList assignedIds={[]} onUpdate={onUpdate} />)

  expect(view).toMatchSnapshot()
})