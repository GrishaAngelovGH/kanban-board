import { render } from "@testing-library/react"

import UserList from "./UserList"

jest.mock('persistent/persistentUserRepository')

test("should render UserList component", () => {
  const onUpdate = jest.fn()

  const view = render(<UserList assignedIds={[]} onUpdate={onUpdate} />)

  expect(view).toMatchSnapshot()
})