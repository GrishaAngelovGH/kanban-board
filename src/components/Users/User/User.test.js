import { render } from "@testing-library/react"

import User from "./User"

test("should render Users/User component", () => {
  const view = render(<User name="John Smith" image="img" />)

  expect(view).toMatchSnapshot()
})