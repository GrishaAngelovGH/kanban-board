import { render } from "@testing-library/react"

import BoardMenu from "./BoardMenu"

test("should render BoardMenu component", () => {
  const view = render(<BoardMenu />)

  expect(view).toMatchSnapshot()
})