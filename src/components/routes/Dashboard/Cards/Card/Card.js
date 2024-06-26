const Card = ({ title, children }) => (
  <div style={{ height: 350 }} className="col col-md-5 bg-white rounded shadow">
    <Card.Header title={title} />

    <Card.Body>
      {children}
    </Card.Body>
  </div>
)

Card.Header = ({ title }) => (
  <div className="d-flex justify-content-between align-items-center">
    <p className="m-0">{title}</p>
    <i className="bi bi-star fs-4 text-warning"></i>
  </div>
)

Card.Body = ({ children }) => (
  <div className="d-flex justify-content-center">
    {
      children
    }
  </div>
)

export default Card