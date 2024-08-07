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

test("should render Header component", () => {
  const onUpdate = jest.fn()

  const handlers = {
    onCalendarClick: onUpdate,
    onImportKanbanBoardClick: onUpdate,
    onSettingsClick: onUpdate,
    onUsersClick: onUpdate,
    onUpdate: onUpdate
  }

  const view = render(<Header handlers={handlers} />)

  const menu = view.container.querySelector('[role="group"]')

  act(() => {
    fireEvent.click(menu.firstChild)
  })

  waitFor(() => {
    expect(view).toMatchSnapshot()
  })
})