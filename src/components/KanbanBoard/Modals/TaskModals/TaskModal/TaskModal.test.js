import { render } from "@testing-library/react"

import TaskModal from "./TaskModal"

const onUpdate = jest.fn()

const handlers = {
  onTitleChange: onUpdate,
  onDescriptionChange: onUpdate,
  onPriorityChange: onUpdate,
  onShowTemplatesChange: onUpdate,
  onTemplateChange: onUpdate,
  onUpdate
}

test("should render TaskModal component", () => {

  const view = render(
    <TaskModal
      show={true}
      modalTitle="Create New Task"
      title="Title Task"
      description="Title Description"
      priority="medium"
      templates={[]}
      handlers={handlers}
    />
  )

  expect(view).toMatchSnapshot()
})

test("should render TaskModal component as a template", () => {
  const view = render(
    <TaskModal
      show={true}
      modalTitle="Create New Task"
      title="Title Task"
      description="Title Description"
      priority="medium"
      isTemplate={true}
      templates={[]}
      handlers={handlers}
    />
  )

  expect(view).toMatchSnapshot()
})

test("should render TaskModal component in edit mode", () => {
  const view = render(
    <TaskModal
      show={true}
      isEdit={true}
      modalTitle="Create New Task"
      title="Title Task"
      description="Title Description"
      priority="medium"
      isTemplate={true}
      templates={[]}
      handlers={handlers}
    />
  )

  expect(view).toMatchSnapshot()
})

test("should render TaskModal component with visualized templates", () => {
  const templates = [
    {
      id: 1,
      title: "",
      description: "Template Description 1",
      isTemplate: true
    },
    {
      id: 2,
      title: "",
      description: "Template Description 2",
      isTemplate: true
    }
  ]

  const view = render(
    <TaskModal
      show={true}
      modalTitle="Create New Task"
      title=""
      templates={templates}
      showTemplates={true}
      handlers={handlers}
    />
  )

  expect(view).toMatchSnapshot()
})
