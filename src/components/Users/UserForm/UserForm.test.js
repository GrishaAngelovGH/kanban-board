import { render } from "@testing-library/react"

import UserForm from "./UserForm"

test("should render UserForm component", () => {
  const view = render(<UserForm />)

  expect(view).toMatchSnapshot()
})