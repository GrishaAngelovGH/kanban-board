import { render } from "@testing-library/react"

import Avatar from "./Avatar"

test("should render Avatar component with image", () => {
  const view = render(<Avatar user={{ image: "image", name: "John Smith" }} />)

  expect(view).toMatchSnapshot()
})

test("should render Avatar component with user initials", () => {
  const view = render(<Avatar user={{ image: "", name: "John Smith" }} />)

  expect(view).toMatchSnapshot()
})