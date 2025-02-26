import { render } from "@testing-library/react"

import TasksPerPriorityCard from "./TasksPerPriorityCard"

jest.mock('react-chartjs-2', () => ({ Bar: () => <div>Bar Chart</div> }))

test("should render TasksPerPriorityCard component", () => {
  const view = render(
    <TasksPerPriorityCard />
  )

  expect(view).toMatchSnapshot()
})