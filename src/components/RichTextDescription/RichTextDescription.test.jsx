import { render } from "@testing-library/react"

import RichTextDescription from "./RichTextDescription"

test("should render RichTextDescription component", () => {
  const view = render(<RichTextDescription description="this is a <b>rich text</b> description" />)

  expect(view).toMatchSnapshot()
})