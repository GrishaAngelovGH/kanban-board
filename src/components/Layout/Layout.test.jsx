import { render } from "@testing-library/react"

import Layout from "./Layout"

test("should render Layout component", () => {
  const view = render(
    <Layout
      header={<div>Header</div>}
      body={<div>Body</div>}
    />
  )

  expect(view).toMatchSnapshot()
})