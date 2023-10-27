import { render } from "@testing-library/react"

import UserList from "./UserList"

test("should render UserList component", () => {
  const task = { id: 1, title: "Title", description: "Description", assignedIds: [] }
  const onUpdate = jest.fn()

  const view = render(<UserList task={task} onUpdate={onUpdate} />)

  expect(view).toMatchSnapshot()
})