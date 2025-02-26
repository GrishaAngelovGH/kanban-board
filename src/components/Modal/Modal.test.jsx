import { render } from "@testing-library/react"

import Modal from "./Modal"

test("should render Modal component", () => {
  const view = render(
    <Modal
      show
      title="Modal Title"
      body="Modal Body"
    />
  )

  expect(view).toMatchSnapshot()
})

test("should render Modal component with hidden confirm button", () => {
  const view = render(
    <Modal
      show
      title="Modal Title"
      body="Modal Body"
      hideConfirm
    />
  )

  expect(view).toMatchSnapshot()
})