import { Link } from "react-router-dom"

import useBackgroundImage from "hooks/useBackgroundImage"

const Page = ({ description, children }) => {
  const backgroundImage = useBackgroundImage()

  return (
    <div className="row g-0 min-vh-100" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none", backgroundSize: "cover" }}>
      <div className="col-12">
        <div className="row g-0 bg-light p-2 shadow align-items-center">
          <div className="col-2 col-md-1">
            <Link to="/" className="btn btn-light bi bi-arrow-left border"></Link>
          </div>
          {
            description
          }
        </div>
        {children}
      </div>
    </div>
  )
}

export default Page