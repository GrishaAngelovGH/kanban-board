import { render } from "@testing-library/react"

import ScrollNavigationButtons from "./ScrollNavigationButtons"

test("should render ScrollNavigationButtons component", () => {
  const view = render(<ScrollNavigationButtons />)

  expect(view).toMatchSnapshot()
})