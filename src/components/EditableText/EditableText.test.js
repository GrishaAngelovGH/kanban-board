import { render } from "@testing-library/react"

import EditableText from "./EditableText"

test("should render EditableText component", () => {
  const view = render(
    <EditableText>
      <span>Text</span>
    </EditableText>
  )

  expect(view).toMatchSnapshot()
})