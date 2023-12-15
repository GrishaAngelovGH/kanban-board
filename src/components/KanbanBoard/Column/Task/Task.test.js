import { render } from "@testing-library/react"

import Task from "./Task"

jest.mock('persistent/persistentUserRepository')

test("should render Task component", () => {
  const view = render(
    <Task
      title="Task Title"
      description="Task Description"
      column="Column Title"
      assignedIds={[]}
      priority="medium"
      isLocked={false}
    />
  )

  expect(view).toMatchSnapshot()
})

test("should render Task component as a template", () => {
  const view = render(
    <Task
      isTemplate={true}
      description="Template Description"
      column="Column Title"
      assignedIds={[]}
      priority=""
    />
  )

  expect(view).toMatchSnapshot()
})