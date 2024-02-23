import { render } from "@testing-library/react"

import WordHighlighter from "./WordHighlighter"

test("should render WordHighlighter component", () => {
  const view = render(<WordHighlighter text="this is a sample text" />)

  expect(view).toMatchSnapshot()
})