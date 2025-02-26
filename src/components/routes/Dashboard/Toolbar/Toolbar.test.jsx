import { render } from "@testing-library/react"

import Toolbar from "./Toolbar"

test("should render Dashboard/Toolbar component", () => {
  const view = render(
    <Toolbar items={[{ title: "Item 1" }, { title: "Item 2" }]} />
  )

  expect(view).toMatchSnapshot()
})