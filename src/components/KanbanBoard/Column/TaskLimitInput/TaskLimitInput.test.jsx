import { render } from "@testing-library/react"
import { vi } from "vitest"

import TaskLimitInput from "./TaskLimitInput"

test("should render TaskLimitInput component", () => {
  const onChange = vi.fn()

  const view = render(<TaskLimitInput currentLimit={0} onChange={onChange} />)

  expect(view).toMatchSnapshot()
})