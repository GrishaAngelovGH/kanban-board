import { render } from "@testing-library/react"

import User from "./User"

test("should render User component", () => {
  const view = render(<User name="John Smith" image="img" selected={false} />)

  expect(view).toMatchSnapshot()
})