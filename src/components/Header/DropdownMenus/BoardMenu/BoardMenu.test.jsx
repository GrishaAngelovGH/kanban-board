import { render, fireEvent, act, waitFor } from "@testing-library/react"
import { vi, beforeEach, afterEach } from "vitest"

import BoardMenu from "./BoardMenu"

vi.mock("persistent/history")

beforeEach(() => {
  vi.spyOn(Date.prototype, "toString").mockReturnValue("Wed Jan 03 2024 09:31:43")
})

afterEach(() => {
  vi.restoreAllMocks()
})

test("should render BoardMenu component", () => {
  const view = render(<BoardMenu />)

  act(() => {
    const parentElement = view.container.firstChild
    const dropdownButton = parentElement.firstChild

    fireEvent.click(dropdownButton)
  })

  waitFor(() => {
    expect(view).toMatchSnapshot()
  })
})