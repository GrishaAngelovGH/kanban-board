const Toolbar = ({ items, onClick }) => (
  <div className="mt-2 row g-0 justify-content-center">
    <div className="col-11 bg-primary-subtle rounded p-2">
      <p className="text-secondary text-center">Click on any item to add the corresponding card to the dashboard</p>
      <div className="row flex-column flex-md-row g-1 justify-content-evenly">
        {
          items.map((v, i) => (
            <div
              key={i}
              data-testid="toolbar-item"
              className="col-md-2 bg-primary text-white text-center rounded"
              onClick={() => { onClick(v.id) }}
            >
              {v.title}
            </div>
          ))
        }
      </div>
    </div>
  </div>
)

export default Toolbar