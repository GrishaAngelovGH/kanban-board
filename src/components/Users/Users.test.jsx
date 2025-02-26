import { render } from "@testing-library/react"

import Users from "./Users"

test("should render Users component", () => {
  const view = render(<Users show />)

  expect(view).toMatchSnapshot()
})