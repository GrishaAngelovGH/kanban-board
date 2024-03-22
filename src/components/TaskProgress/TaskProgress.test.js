import { render } from "@testing-library/react"

import TaskProgress from "./TaskProgress"

test("should render TaskProgress component", () => {
  const columns = [
    {
      id: "851904397063169",
      title: "In Progress",
      description: "Provide the work items that are currently being worked on by the team.",
      limit: 0,
      items: [
        { id: "2793331195588513", title: "Implement ProductDetailPage component", description: "A ProductDetailPage component should be implemented to be able to visualize all relevant information about given product.", assignedIds: [], priority: "medium", isLocked: false, isActive: false, isTemplate: false }
      ]
    },
    {
      id: "13372358665210715",
      title: "Done",
      description: "Provide the work items that are considered completed or finished in the process of development.",
      limit: 0,
      markedAsDone: true,
      items: [
        { id: "3489073798557012", title: "Show notification after successfull order confirmation", description: "The system should be able to show relevant notification after the user successfully confirm current order.", assignedIds: [], priority: "medium", isLocked: false, isActive: false, isTemplate: false }
      ]
    }
  ]

  const view = render(<TaskProgress columns={columns} />)

  expect(view).toMatchSnapshot()
})