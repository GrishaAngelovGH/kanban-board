import { render } from "@testing-library/react"

import Toast from "./Toast"

test("should render Toast component", () => {
  const view = render(<Toast show title="Title" body="Body" />)

  expect(view).toMatchSnapshot()
})