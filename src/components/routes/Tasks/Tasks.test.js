import { render } from "@testing-library/react"

import Tasks from "./Tasks"

test("should render Tasks route component", () => {
  const view = render(<Tasks userId="9010122801186593" />)

  expect(view).toMatchSnapshot()
})