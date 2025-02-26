import "./Avatar.css"

const Avatar = ({ user: { image, name }, size = 50 }) => {
  const hasImage = image.length > 0
  const nameInitials = name.split(" ").map(v => v[0]).join("")

  return hasImage ?
    (
      <img src={image} width={size} className="rounded-circle m-1" alt="user" />
    ) :
    (
      <div
        className="rounded-circle border border-secondary m-1 d-flex justify-content-center align-items-center fw-bold avatar"
        style={{ width: size, height: size }}
      >
        {nameInitials}
      </div>
    )
}

export default Avatar