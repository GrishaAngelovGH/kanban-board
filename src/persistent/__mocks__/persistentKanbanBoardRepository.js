const persistentKanbanBoardRepository = {
  getColumns: () => [
    {
      id: "851904397063169",
      title: "In Progress",
      description: "Provide the work items that are currently being worked on by the team.",
      limit: 0,
      items: [
        { id: "2793331195588513", title: "Implement ProductDetailPage component", description: "A ProductDetailPage component should be implemented to be able to visualize all relevant information about given product.", assignedIds: [], priority: "medium", isLocked: false, isTemplate: false }
      ]
    },
    {
      id: "13372358665210715",
      title: "Done",
      description: "Provide the work items that are considered completed or finished in the process of development.",
      limit: 0,
      markedAsDone: true,
      items: [
        { id: "3489073798557012", title: "Show notification after successfull order confirmation", description: "The system should be able to show relevant notification after the user successfully confirm current order.", assignedIds: [], priority: "medium", isLocked: false, isTemplate: false }
      ]
    }
  ],
  getColumnsWithAssignedTasksForUser: userId => {
    return [
      {
        id: "16244686152977938",
        title: "Backlog",
        description: "Prioritized list of features that should be implemented as part of a project.",
        limit: 0,
        items: [
          { id: "27833411730699775", title: "Implement ConfirmButton component for ProductModal", description: "A ConfirmButton component should be implemented to allow confirming selected product features in ProductModal.", assignedIds: [userId], priority: "", isLocked: false, isTemplate: false },
          { id: "5900400848369358", title: "Redesign ProductPage to allow more space for visualization of products", description: "The ProductPage needs a redesign to allow more space for visualization of products.", assignedIds: [userId], priority: "", isLocked: false, isTemplate: false }
        ]
      }
    ]
  }
}

export default persistentKanbanBoardRepository