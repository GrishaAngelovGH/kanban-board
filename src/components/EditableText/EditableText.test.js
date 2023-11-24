import { render, fireEvent } from "@testing-library/react"

import EditableText from "./EditableText"

test("should render EditableText component", () => {
  const view = render(
    <EditableText>
      <span>Text</span>
    </EditableText>
  )

  expect(view).toMatchSnapshot()
})

test("should render EditableText component as an input", () => {
  const view = render(
    <EditableText>
      <span>Text</span>
    </EditableText>
  )

  fireEvent.click(view.container.firstChild)

  expect(view).toMatchSnapshot()
})

test("should render EditableText component as a textarea", () => {
  const view = render(
    <EditableText isTextArea={true}>
      <span>Text</span>
    </EditableText>
  )

  fireEvent.click(view.container.firstChild)

  expect(view).toMatchSnapshot()
})