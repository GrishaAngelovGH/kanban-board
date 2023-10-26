import { render } from "@testing-library/react"

import UserList from "./UserList"

test("should render UserList component", () => {
  const onUpdate = jest.fn()
  const view = render(<UserList onUpdate={onUpdate} />)

  expect(view).toMatchSnapshot()
})