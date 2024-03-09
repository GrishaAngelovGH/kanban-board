import alexanderReed from "assets/images/users/alexander-reed.jpg"
import avaRoberts from "assets/images/users/ava-roberts.jpg"
import ethanThompson from "assets/images/users/ethan-thompson.jpg"
import isabellaFoster from "assets/images/users/isabella-foster.jpg"
import noahAngerson from "assets/images/users/noah-anderson.jpg"
import sophiaCampbell from "assets/images/users/sophia-campbell.jpg"

const persistentKanbanBoardGenerator = {
  generate: () => {
    const columns = {
      "16244686152977938": {
        id: "16244686152977938",
        title: "Backlog",
        description: "Prioritized list of features that should be implemented as part of a project.",
        limit: 0,
        assignedIds: [],
        items: [
          { id: "27833411730699775", title: "Implement ConfirmButton component for ProductModal", description: "A ConfirmButton component should be implemented to allow confirming selected product features in ProductModal.", assignedIds: [], priority: "", isLocked: false, isActive: false, isTemplate: false },
          { id: "5900400848369358", title: "Redesign ProductPage to allow more space for visualization of products", description: "The ProductPage needs a redesign to allow more space for visualization of products.", assignedIds: [], priority: "", isLocked: false, isActive: false, isTemplate: false }
        ]
      },
      "851904397063169": {
        id: "851904397063169",
        title: "In Progress",
        description: "Provide the work items that are currently being worked on by the team.",
        limit: 0,
        assignedIds: [],
        items: [
          { id: "2793331195588513", title: "Implement ProductDetailPage component", description: "A ProductDetailPage component should be implemented to be able to visualize all relevant information about given product.", assignedIds: ["9010122801186593", "927257799921221", "9245063188089464", "8944354170460678", "23179223528758852", "7071360811547569"], priority: "medium", isLocked: false, isActive: false, isTemplate: false }
        ]
      },
      "13372358665210715": {
        id: "13372358665210715",
        title: "Done",
        description: "Provide the work items that are considered completed or finished in the process of development.",
        limit: 0,
        markedAsDone: true,
        assignedIds: [],
        items: [
          { id: "3489073798557012", title: "Show notification after successfull order confirmation", description: "The system should be able to show relevant notification after the user successfully confirm current order.", assignedIds: ["7071360811547569", "23179223528758852", "8944354170460678"], priority: "medium", isLocked: false, isActive: false, isTemplate: false }
        ]
      }
    }

    const users = {
      "9010122801186593": { id: "9010122801186593", name: "Alexander Reed", image: alexanderReed },
      "927257799921221": { id: "927257799921221", name: "Ava Roberts", image: avaRoberts },
      "9245063188089464": { id: "9245063188089464", name: "Ethan Thompson", image: ethanThompson },
      "8944354170460678": { id: "8944354170460678", name: "Isabella Foster", image: isabellaFoster },
      "23179223528758852": { id: "23179223528758852", name: "Noah Anderson", image: noahAngerson },
      "7071360811547569": { id: "7071360811547569", name: "Sophia Campbell", image: sophiaCampbell }
    }

    localStorage.setItem("columns", JSON.stringify(columns))
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.removeItem("priority")
    localStorage.removeItem("searchCriteria")
  }
}

export default persistentKanbanBoardGenerator