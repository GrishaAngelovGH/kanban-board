import { render } from "@testing-library/react"

import Column from "./Column"

test("should render Column component", () => {
  const view = render(<Column />)

  expect(view).toMatchSnapshot()
})