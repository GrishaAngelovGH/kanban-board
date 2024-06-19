import { Link } from "react-router-dom"

import useBackgroundImage from "hooks/useBackgroundImage"

const Dashboard = () => {
  const backgroundImage = useBackgroundImage()

  return (
    <div className="row g-0 vh-100" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none", backgroundSize: "cover" }}>
      <div className="col-12">
        <div className="row g-0 bg-light p-2 shadow align-items-center">
          <div className="col-2">
            <Link to="/" className="btn btn-light bi bi-arrow-left border"></Link>
          </div>
          <div className="col-8">
            <h3 className="m-0 text-center">Dashboard</h3>
          </div>
        </div>

        <div className="row g-0 mt-3 justify-content-center overflow-auto tasks">
          <div className="col-10">
            Content
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard