import { render } from "@testing-library/react"
import { vi } from "vitest"

import TasksPerMemberCard from "./TasksPerMemberCard"

vi.mock('react-chartjs-2', () => ({
  Bar: () => <div>Bar Chart</div>
}))

test("should render TasksPerMemberCard component", () => {
  const view = render(
    <TasksPerMemberCard />
  )

  expect(view).toMatchSnapshot()
})