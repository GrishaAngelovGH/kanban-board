import { render } from "@testing-library/react"

import ClearBoardModal from "./ClearBoardModal"

test("should render ClearBoardModal component", () => {
  const view = render(<ClearBoardModal show />)

  expect(view).toMatchSnapshot()
})