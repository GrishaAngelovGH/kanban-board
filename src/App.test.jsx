import { render } from "@testing-library/react"

import App from "./App"

window.URL.createObjectURL = jest.fn()

afterEach(() => {
  window.URL.createObjectURL.mockReset()
})

test("should render App component", () => {
  const view = render(<App />)

  expect(view).toMatchSnapshot()
})