import { render } from "@testing-library/react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Page from "./Page"

test("should render routes/Page component", () => {
  const view = render(
    <Router>
      <Routes>
        <Route path="/" element={
          <Page description={<div>Description</div>}>
            <div>content</div>
          </Page>
        } />
      </Routes>
    </Router>
  )

  expect(view).toMatchSnapshot()
})