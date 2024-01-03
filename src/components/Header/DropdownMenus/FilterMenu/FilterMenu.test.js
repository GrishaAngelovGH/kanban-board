import { render, fireEvent, act, waitFor } from "@testing-library/react"

import FilterMenu from "./FilterMenu"

test("should render FilterMenu component", async () => {
  const view = render(<FilterMenu />)

  act(() => {
    const parentElement = view.container.firstChild
    const dropdownButton = parentElement.firstChild

    fireEvent.click(dropdownButton)
  })

  await waitFor(() => {
    expect(view).toMatchSnapshot()
  })
})