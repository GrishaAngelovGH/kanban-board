const persistentKanbanBoardGenerator = {
  generate: () => {
    const columns = {
      "Backlog": {
        title: "Backlog",
        description: "Prioritized list of features that should be implemented as part of a project.",
        items: [
          { title: "Implement ConfirmButton component for ProductModal", description: "A ConfirmButton component should be implemented to allow confirming selected product features in ProductModal." },
          { title: "Redesign ProductPage to allow more space for visualization of products", description: "The ProductPage needs a redesign to allow more space for visualization of products." }
        ]
      },
      "In Progress": {
        title: "In Progress",
        description: "Provide the work items that are currently being worked on by the team.",
        items: [
          { title: "Implement ProductDetailPage component", description: "A ProductDetailPage component should be implemented to be able to visualize all relevant information about given product." }
        ]
      },
      "Done": {
        title: "Done",
        description: "Provide the work items that are considered completed or finished in the process of development.",
        items: [
          { title: "Show notification after successfull order confirmation", description: "The system should be able to show relevant notification after the user successfully confirm current order." }
        ]
      }
    }

    localStorage.setItem("columns", JSON.stringify(columns))
  }
}

export default persistentKanbanBoardGenerator