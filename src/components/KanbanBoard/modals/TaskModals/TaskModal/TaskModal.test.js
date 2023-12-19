import { render } from "@testing-library/react"

import TaskModal from "./TaskModal"

test("should render TaskModal component", () => {
  const onUpdate = jest.fn()

  const view = render(
    <TaskModal
      show={true}
      modalTitle="Create New Task"
      title="Title Task"
      description="Title Description"
      priority="medium"
      onTitleChange={onUpdate}
      onDescriptionChange={onUpdate}
      onPriorityChange={onUpdate}
    />
  )

  expect(view).toMatchSnapshot()
})

test("should render TaskModal component as a template", () => {
  const onUpdate = jest.fn()
  const onTemplateChange = jest.fn()

  const view = render(
    <TaskModal
      show={true}
      modalTitle="Create New Task"
      title="Title Task"
      description="Title Description"
      priority="medium"
      isTemplate={true}
      onTitleChange={onUpdate}
      onDescriptionChange={onUpdate}
      onPriorityChange={onUpdate}
      onTemplateChange={onTemplateChange}
    />
  )

  expect(view).toMatchSnapshot()
})

test("should render TaskModal component in edit mode", () => {
  const onUpdate = jest.fn()
  const onTemplateChange = jest.fn()

  const view = render(
    <TaskModal
      show={true}
      isEdit={true}
      modalTitle="Create New Task"
      title="Title Task"
      description="Title Description"
      priority="medium"
      isTemplate={true}
      onTitleChange={onUpdate}
      onDescriptionChange={onUpdate}
      onPriorityChange={onUpdate}
      onTemplateChange={onTemplateChange}
    />
  )

  expect(view).toMatchSnapshot()
})

test("should render TaskModal component with visualized templates", () => {
  const onTemplateChange = jest.fn()

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
      onShowTemplatesChange={onTemplateChange}
    />
  )

  expect(view).toMatchSnapshot()
})
