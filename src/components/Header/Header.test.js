import { render } from "@testing-library/react"

import Header, { CalendarButton, ExchangeButton, SettingsButton } from "./Header"

test("should render Header component", () => {
  const view = render(<Header />)

  expect(view).toMatchSnapshot()
})

test("should render CalendarButton component", () => {
  const view = render(<CalendarButton />)

  expect(view).toMatchSnapshot()
})

test("should render ExchangeButton component", () => {
  const view = render(<ExchangeButton />)

  expect(view).toMatchSnapshot()
})

test("should render SettingsButton component", () => {
  const view = render(<SettingsButton />)

  expect(view).toMatchSnapshot()
})