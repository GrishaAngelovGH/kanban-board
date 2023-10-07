import { render } from "@testing-library/react"

import Layout from "./Layout"

test("should render Layout component", () => {
  const view = render(<Layout />)

  expect(view).toMatchSnapshot()
})