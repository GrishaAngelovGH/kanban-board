const Card = ({ id, title, children, onClose }) => (
  <div style={{ height: 350 }} className="col col-md-5 bg-white rounded shadow">
    <Card.Header id={id} title={title} onClose={onClose} />

    <Card.Body>
      {children}
    </Card.Body>
  </div>
)

Card.Header = ({ id, title, onClose }) => (
  <div className="d-flex justify-content-between align-items-center">
    <p className="m-0">{title}</p>
    <div className="d-flex align-items-center">
      <i className="bi bi-star fs-4 text-warning"></i>
      <i className="bi bi-x fs-2" onClick={() => { onClose(id) }}></i>
    </div>
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