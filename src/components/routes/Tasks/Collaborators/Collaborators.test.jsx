import { render } from "@testing-library/react"

import Collaborators from "./Collaborators"

jest.mock("persistent/persistentUserRepository")

test("should render Collaborators component", () => {
  const view = render(<Collaborators ids={["1", "2"]} userId="1" />)

  expect(view).toMatchSnapshot()
})