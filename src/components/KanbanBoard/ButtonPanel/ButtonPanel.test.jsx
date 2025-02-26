import { render } from "@testing-library/react"

import ButtonPanel from "./ButtonPanel"

test("should render ButtonPanel component", () => {
  const view = render(<ButtonPanel />)

  expect(view).toMatchSnapshot()
})