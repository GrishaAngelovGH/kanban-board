import { render } from "@testing-library/react"

import DependencyList from "./DependencyList"

import boardRepository from "persistent/persistentKanbanBoardRepository"

test("should render TaskDependencies/DependencyList component", () => {
  jest.spyOn(boardRepository, 'getDependencyTasks').mockReturnValue([
    { id: 1, title: "Dependency Task 1" },
    { id: 2, title: "Dependency Task 2" }
  ])

  const view = render(
    <DependencyList
      taskId="2793331195588513"
      columnId="851904397063169"
    />
  )

  expect(view).toMatchSnapshot()
})