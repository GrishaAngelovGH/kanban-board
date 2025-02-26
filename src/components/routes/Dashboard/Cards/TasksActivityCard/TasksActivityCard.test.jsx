import { render } from "@testing-library/react"
import { vi } from "vitest"

import TasksActivityCard from "./TasksActivityCard"

vi.mock('react-chartjs-2', () => ({
  Bar: () => <div>Bar Chart</div>
}))

test("should render TasksActivityCard component", () => {
  const view = render(
    <TasksActivityCard />
  )

  expect(view).toMatchSnapshot()
})