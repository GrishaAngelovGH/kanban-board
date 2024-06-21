import { render } from "@testing-library/react"

import TasksPerMemberCard from "./TasksPerMemberCard"

jest.mock('react-chartjs-2', () => ({ Bar: () => <div>Bar Chart</div> }))

test("should render TasksPerMemberCard route component", () => {
  const view = render(
    <TasksPerMemberCard />
  )

  expect(view).toMatchSnapshot()
})