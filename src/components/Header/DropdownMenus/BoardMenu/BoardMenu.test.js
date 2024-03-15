import { render, fireEvent, act, waitFor } from "@testing-library/react"

import BoardMenu from "./BoardMenu"

jest.mock("persistent/history")

beforeEach(() => {
  jest.spyOn(Date.prototype, "toString").mockReturnValue("Wed Jan 03 2024 09:31:43")
})

afterEach(() => {
  jest.restoreAllMocks()
})

test("should render BoardMenu component", async () => {
  const view = render(<BoardMenu />)

  act(() => {
    const parentElement = view.container.firstChild
    const dropdownButton = parentElement.firstChild

    fireEvent.click(dropdownButton)
  })

  await waitFor(() => {
    expect(view).toMatchSnapshot()
  })
})