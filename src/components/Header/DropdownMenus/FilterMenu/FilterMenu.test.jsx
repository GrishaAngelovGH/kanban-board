import { render, fireEvent, act, waitFor } from "@testing-library/react"

import FilterMenu from "./FilterMenu"

import boardRepository from "persistent/persistentKanbanBoardRepository"

test("should render FilterMenu component", () => {
  jest.spyOn(boardRepository, 'getPriorityFilter').mockReturnValue(null)

  const view = render(<FilterMenu />)

  act(() => {
    const parentElement = view.container.firstChild
    const dropdownButton = parentElement.firstChild

    fireEvent.click(dropdownButton)
  })

  waitFor(() => {
    expect(view).toMatchSnapshot()
  })
})

test("should render FilterMenu component with priority", () => {
  jest.spyOn(boardRepository, 'getPriorityFilter').mockReturnValue("Medium")

  const view = render(<FilterMenu />)

  act(() => {
    const parentElement = view.container.firstChild
    const dropdownButton = parentElement.firstChild

    fireEvent.click(dropdownButton)
  })

  waitFor(() => {
    expect(view).toMatchSnapshot()
  })
})