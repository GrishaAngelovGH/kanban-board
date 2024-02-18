import { render } from "@testing-library/react"

import MoveToColumnDropdownButton from "./MoveToColumnDropdownButton"

test("should render MoveToColumnDropdownButton component", () => {
  const columns = [
    {
      id: "16244686152977938",
      title: "Backlog",
      description: "Prioritized list of features that should be implemented as part of a project.",
      limit: 0,
      items: [
        { id: "27833411730699775", title: "Implement ConfirmButton component for ProductModal", description: "A ConfirmButton component should be implemented to allow confirming selected product features in ProductModal.", assignedIds: [], priority: "", isLocked: false, isTemplate: false },
        { id: "5900400848369358", title: "Redesign ProductPage to allow more space for visualization of products", description: "The ProductPage needs a redesign to allow more space for visualization of products.", assignedIds: [], priority: "", isLocked: false, isTemplate: false }
      ]
    },
    {
      id: "851904397063169",
      title: "In Progress",
      description: "Provide the work items that are currently being worked on by the team.",
      limit: 0,
      items: [
        { id: "2793331195588513", title: "Implement ProductDetailPage component", description: "A ProductDetailPage component should be implemented to be able to visualize all relevant information about given product.", assignedIds: [], priority: "medium", isLocked: false, isTemplate: false }
      ]
    }
  ]

  const view = render(<MoveToColumnDropdownButton columns={columns} column={columns[0]} />)

  expect(view).toMatchSnapshot()
})