import RichTextDescription from "components/RichTextDescription"

const Task = ({ title, description, priority }) => {

  return (
    <div className="mt-3 border border-3 shadow rounded p-3 bg-light">
      <h3>{title}</h3>

      <RichTextDescription description={description} className="mb-3" />

      {
        priority.length > 0 && (
          <p className="text-capitalize">Priority: {priority}</p>
        )
      }
    </div>
  )
}

export default Task