import { render, screen, fireEvent } from "@testing-library/react"

import Menu from "./Menu"

test("should render Column/Menu component", () => {
  const view = render(<Menu />)

  const toggleButton = screen.getByRole("button")

  fireEvent.click(toggleButton)

  expect(view).toMatchSnapshot()
})