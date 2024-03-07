import { render } from "@testing-library/react"

import Modals from "./Modals"

describe("Modals", () => {
  const update = {
    onUpdate: () => { },
    toggleColumnModal: () => { },
    setShowColumnModal: () => { },
    toggleClearBoardModal: () => { },
    setShowClearBoardModal: () => { },
    setShowAddTaskModal: () => { },
    setShowEditTaskModal: () => { },
    setShowAssignUserModal: () => { },
    onToggleUploadKanbanBoardModal: () => { }
  }

  test("should render ColumnModal component", () => {
    const view = render(
      <Modals
        show={{
          showColumnModal: true,
          showClearBoardModal: false,
          showAddTaskModal: false,
          showEditTaskModal: false,
          showAssignUserModal: false,
          showUploadBoardModal: false,
          showToastWithMessage: false,
        }}
        update={update}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test("should render ClearBoardModal component", () => {
    const view = render(
      <Modals
        show={{
          showColumnModal: false,
          showClearBoardModal: true,
          showAddTaskModal: false,
          showEditTaskModal: false,
          showAssignUserModal: false,
          showUploadBoardModal: false,
          showToastWithMessage: false,
        }}
        update={update}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test("should render NewTaskModal component", () => {
    const view = render(
      <Modals
        show={{
          showColumnModal: false,
          showClearBoardModal: false,
          showAddTaskModal: true,
          showEditTaskModal: false,
          showAssignUserModal: false,
          showUploadBoardModal: false,
          showToastWithMessage: false,
        }}
        update={update}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test("should render EditTaskModal component", () => {
    const view = render(
      <Modals
        show={{
          showColumnModal: false,
          showClearBoardModal: false,
          showAddTaskModal: false,
          showEditTaskModal: true,
          showAssignUserModal: false,
          showUploadBoardModal: false,
          showToastWithMessage: false,
        }}
        update={update}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test("should render AssignUserModal component", () => {
    const view = render(
      <Modals
        task={{
          title: "Task 1",
          description: "Task Description",
          assignedIds: ["9010122801186593"]
        }}
        show={{
          showColumnModal: false,
          showClearBoardModal: false,
          showAddTaskModal: false,
          showEditTaskModal: false,
          showAssignUserModal: true,
          showUploadBoardModal: false,
          showToastWithMessage: false,
        }}
        update={update}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test("should render UploadBoardModal component", () => {
    const view = render(
      <Modals
        show={{
          showColumnModal: false,
          showClearBoardModal: false,
          showAddTaskModal: false,
          showEditTaskModal: false,
          showAssignUserModal: false,
          showUploadBoardModal: true,
          showToastWithMessage: false,
        }}
        update={update}
      />
    )

    expect(view).toMatchSnapshot()
  })
})