import { render } from "@testing-library/react"
import { vi } from "vitest"

import App from "./App"

window.URL.createObjectURL = vi.fn()

afterEach(() => {
  window.URL.createObjectURL.mockReset()
})

test("should render App component", () => {
  const view = render(<App />)

  expect(view).toMatchSnapshot()
})