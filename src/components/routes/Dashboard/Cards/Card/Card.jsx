const Card = ({ id, title, children, isFavorite, onAddAsFavorite, onRemoveAsFavorite, onClose }) => (
  <div style={{ height: 350 }} className="col col-md-5 bg-white rounded shadow">
    <Card.Header
      id={id}
      title={title}
      isFavorite={isFavorite}
      onAddAsFavorite={onAddAsFavorite}
      onRemoveAsFavorite={onRemoveAsFavorite}
      onClose={onClose}
    />

    <Card.Body>
      {children}
    </Card.Body>
  </div>
)

Card.Header = ({ id, title, isFavorite, onAddAsFavorite, onRemoveAsFavorite, onClose }) => (
  <div className="d-flex justify-content-between align-items-center">
    <p className="m-0">{title}</p>
    <div className="d-flex align-items-center">
      {!isFavorite && <i className="bi bi-star fs-4 text-warning" onClick={() => { onAddAsFavorite(id) }}></i>}
      {isFavorite && <i className="bi bi-star-fill fs-4 text-warning" onClick={() => { onRemoveAsFavorite(id) }}></i>}
      {!isFavorite && <i className="bi bi-x fs-2" onClick={() => { onClose(id) }}></i>}
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