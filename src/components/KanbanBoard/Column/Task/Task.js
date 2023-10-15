const Task = ({ title, description }) => (
  <div className="row bg-white mt-3 rounded shadow p-1">
    <div className="col-md-12">
      <p className="fw-bold">{title}</p>
      <p className="text-secondary m-0">{description}</p>
    </div>
  </div>
)

export default Task