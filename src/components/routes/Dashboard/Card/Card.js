const Card = ({ title, children }) => (
  <div style={{ width: 300 }} className="bg-white rounded shadow">
    <div className="d-flex justify-content-between align-items-center">
      <p className="m-0 ms-2">{title}</p>
      <div className="d-flex align-items-center">
        <i className="bi bi-star fs-4 text-warning"></i>
        <i className="bi bi-x fs-2"></i>
      </div>
    </div>
    <div className="d-flex justify-content-center">
      {
        children
      }
    </div>
  </div>
)

export default Card