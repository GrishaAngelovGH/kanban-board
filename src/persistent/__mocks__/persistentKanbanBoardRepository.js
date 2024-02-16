const persistentKanbanBoardRepository = {
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