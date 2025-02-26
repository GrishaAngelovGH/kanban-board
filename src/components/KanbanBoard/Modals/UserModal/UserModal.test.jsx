import { render } from "@testing-library/react"

import UserModal from "./UserModal"

jest.mock('persistent/persistentUserRepository')

test("should render UserModal component", () => {
  const view = render(<UserModal show={true} assignedIds={[1]} title="Assign Users" />)

  expect(view).toMatchSnapshot()
})