import { render } from "@testing-library/react"

import Card from "./Card"

test("should render Card component", () => {
  const view = render(
    <Card title="Card Title">
      <div>content</div>
    </Card>
  )

  expect(view).toMatchSnapshot()
})