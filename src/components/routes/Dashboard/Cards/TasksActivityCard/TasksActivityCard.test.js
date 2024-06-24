import { render } from "@testing-library/react"

import TasksActivityCard from "./TasksActivityCard"

jest.mock('react-chartjs-2', () => ({ Bar: () => <div>Bar Chart</div> }))

test("should render TasksActivityCard component", () => {
  const view = render(
    <TasksActivityCard />
  )

  expect(view).toMatchSnapshot()
})