import { render } from "@testing-library/react"

import TasksPerColumnCard from "./TasksPerColumnCard"

jest.mock('react-chartjs-2', () => ({ Bar: () => <div>Bar Chart</div> }))

test("should render TasksPerColumnCard component", () => {
  const view = render(
    <TasksPerColumnCard />
  )

  expect(view).toMatchSnapshot()
})