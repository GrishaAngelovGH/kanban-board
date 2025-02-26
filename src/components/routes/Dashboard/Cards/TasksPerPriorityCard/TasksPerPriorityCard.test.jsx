import { render } from "@testing-library/react"
import { vi } from "vitest"

import TasksPerPriorityCard from "./TasksPerPriorityCard"

vi.mock('react-chartjs-2', () => ({
  Bar: () => <div>Bar Chart</div>
}))

test("should render TasksPerPriorityCard component", () => {
  const view = render(
    <TasksPerPriorityCard />
  )

  expect(view).toMatchSnapshot()
})