import useBackgroundImage from "hooks/useBackgroundImage"

const Tasks = ({ userId }) => {
  const backgroundImage = useBackgroundImage()

  return (
    <div className="row g-0 vh-100" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none", backgroundSize: "cover" }}>
      <div className="col-12">
        UserID: {userId}
      </div>
    </div>
  )
}

export default Tasks