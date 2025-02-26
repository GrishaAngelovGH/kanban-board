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
    setShowAutoAssignUserModal: () => { },
    onToggleUploadKanbanBoardModal: () => { }
  }

  const task = {
    title: "Task 1",
    description: "Task Description",
    assignedIds: ["9010122801186593"],
    priority: "medium",
    isTemplate: false
  }

  test("should render ColumnModal component", () => {
    const view = render(
      <Modals
        task={task}
        show={{
          showColumnModal: true,
          showClearBoardModal: false,
          showAddTaskModal: false,
          showEditTaskModal: false,
          showAssignUserModal: false,
          showAutoAssignUserModal: false,
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
        task={task}
        show={{
          showColumnModal: false,
          showClearBoardModal: true,
          showAddTaskModal: false,
          showEditTaskModal: false,
          showAssignUserModal: false,
          showAutoAssignUserModal: false,
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
        task={task}
        show={{
          showColumnModal: false,
          showClearBoardModal: false,
          showAddTaskModal: true,
          showEditTaskModal: false,
          showAssignUserModal: false,
          showAutoAssignUserModal: false,
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
        task={task}
        show={{
          showColumnModal: false,
          showClearBoardModal: false,
          showAddTaskModal: false,
          showEditTaskModal: true,
          showAssignUserModal: false,
          showAutoAssignUserModal: false,
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
        task={task}
        show={{
          showColumnModal: false,
          showClearBoardModal: false,
          showAddTaskModal: false,
          showEditTaskModal: false,
          showAssignUserModal: true,
          showAutoAssignUserModal: false,
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
        task={task}
        show={{
          showColumnModal: false,
          showClearBoardModal: false,
          showAddTaskModal: false,
          showEditTaskModal: false,
          showAssignUserModal: false,
          showAutoAssignUserModal: false,
          showUploadBoardModal: true,
          showToastWithMessage: false,
        }}
        update={update}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test("should render AutoAssignUserModal component", () => {
    const view = render(
      <Modals
        task={task}
        column={{ id: 123, title: "Column 1", assignedIds: ["9010122801186593"] }}
        show={{
          showColumnModal: false,
          showClearBoardModal: false,
          showAddTaskModal: false,
          showEditTaskModal: false,
          showAssignUserModal: false,
          showAutoAssignUserModal: true,
          showUploadBoardModal: false,
          showToastWithMessage: false,
        }}
        update={update}
      />
    )

    expect(view).toMatchSnapshot()
  })
})