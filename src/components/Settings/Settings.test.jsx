import { render } from "@testing-library/react"

import Settings from "./Settings"

test("should render Settings component", () => {
  const view = render(<Settings show />)

  expect(view).toMatchSnapshot()
})