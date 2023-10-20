const persistentKanbanBoardGenerator = {
  generate: () => {
    const columns = {
      "16244686152977938": {
        id: "16244686152977938",
        title: "Backlog",
        description: "Prioritized list of features that should be implemented as part of a project.",
        items: [
          { id: "27833411730699775", title: "Implement ConfirmButton component for ProductModal", description: "A ConfirmButton component should be implemented to allow confirming selected product features in ProductModal." },
          { id: "5900400848369358", title: "Redesign ProductPage to allow more space for visualization of products", description: "The ProductPage needs a redesign to allow more space for visualization of products." }
        ]
      },
      "851904397063169": {
        id: "851904397063169",
        title: "In Progress",
        description: "Provide the work items that are currently being worked on by the team.",
        items: [
          { id: "2793331195588513", title: "Implement ProductDetailPage component", description: "A ProductDetailPage component should be implemented to be able to visualize all relevant information about given product." }
        ]
      },
      "13372358665210715": {
        id: "13372358665210715",
        title: "Done",
        description: "Provide the work items that are considered completed or finished in the process of development.",
        items: [
          { id: "3489073798557012", title: "Show notification after successfull order confirmation", description: "The system should be able to show relevant notification after the user successfully confirm current order." }
        ]
      }
    }

    localStorage.setItem("columns", JSON.stringify(columns))
  }
}

export default persistentKanbanBoardGenerator