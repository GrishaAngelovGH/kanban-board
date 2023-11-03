import { render } from "@testing-library/react"

import UploadBoardModal from "./UploadBoardModal"

test("should render UploadBoardModal component", () => {
  const view = render(<UploadBoardModal show />)

  expect(view).toMatchSnapshot()
})