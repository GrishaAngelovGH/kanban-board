import { render } from "@testing-library/react"

import NavigationButtons from "./NavigationButtons"

test("should render NavigationButtons component", () => {
  const view = render(<NavigationButtons size="sm" />)

  expect(view).toMatchSnapshot()
})