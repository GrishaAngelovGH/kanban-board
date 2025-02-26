import { render } from "@testing-library/react"

import Notification from "./Notification"

test("should render Notification component", () => {
  const DummyComponent = () => <div>content</div>

  const view = render(
    <Notification>
      <DummyComponent></DummyComponent>
    </Notification>
  )

  expect(view).toMatchSnapshot()
})