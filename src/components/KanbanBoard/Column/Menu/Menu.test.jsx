import { render, screen, fireEvent, act, waitFor } from "@testing-library/react"

import Menu from "./Menu"

test("should render Column/Menu component", () => {
  const view = render(<Menu />)

  const toggleButton = screen.getByRole("button")

  act(() => {
    fireEvent.click(toggleButton)
  })

  waitFor(() => {
    expect(view).toMatchSnapshot()
  })
})