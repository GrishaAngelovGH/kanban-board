import { render } from "@testing-library/react"

import TaskLimitInput from "./TaskLimitInput"

test("should render TaskLimitInput component", () => {
  const onChange = jest.fn()

  const view = render(<TaskLimitInput currentLimit={0} onChange={onChange} />)

  expect(view).toMatchSnapshot()
})