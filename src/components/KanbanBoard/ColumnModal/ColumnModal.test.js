import { render } from "@testing-library/react"

import ColumnModal from "./ColumnModal"

test("should render ColumnModal component", () => {
  const view = render(<ColumnModal />)

  expect(view).toMatchSnapshot()
})