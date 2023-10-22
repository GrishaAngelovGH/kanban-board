import { render } from "@testing-library/react"

import UserList from "./UserList"

test("should render UserList component", () => {
  const view = render(<UserList />)

  expect(view).toMatchSnapshot()
})