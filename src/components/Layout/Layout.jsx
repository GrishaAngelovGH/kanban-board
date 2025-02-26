import "./Layout.css"

const Layout = ({ header, body }) => (
  <div className="row">
    <div className="col-md-12">
      <Header>{header}</Header>
      <Body>{body}</Body>
    </div>
  </div>
)

const Header = ({ children }) => (
  <div className="row layout-header">
    <div className="col-md-12">
      {children}
    </div>
  </div>
)

const Body = ({ children }) => (
  <div className="row layout-body">
    <div className="col-md-12">
      {children}
    </div>
  </div>
)

export default Layout