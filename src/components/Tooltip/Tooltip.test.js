import { render } from "@testing-library/react"

import Tooltip from "./Tooltip"

test("should render Tooltip component", () => {
  const view = render(
    <Tooltip
      label="content-label"
    >
      <div>content</div>
    </Tooltip>
  )

  expect(view).toMatchSnapshot()
})