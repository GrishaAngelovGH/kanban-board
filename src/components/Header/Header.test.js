import { render, fireEvent, act, waitFor } from "@testing-library/react"

import Header from "./Header"

beforeEach(() => {
  const mockedDate = new Date(2023, 11, 22)
  jest.useFakeTimers("modern")
  jest.setSystemTime(mockedDate)
})

afterEach(() => {
  jest.useRealTimers()
})

test("should render Header component", async () => {
  const view = render(<Header />)

  const menu = view.container.querySelector('[role="group"]')

  act(() => {
    fireEvent.click(menu.firstChild)
  })

  await waitFor(() => {
    expect(view).toMatchSnapshot()
  })
})