import { render } from "@testing-library/react"

import EmptyBoard from "./EmptyBoard"

test("should render EmptyBoard component", () => {
  const view = render(<EmptyBoard />)

  expect(view).toMatchSnapshot()
})