import "./Avatar.css"

const Avatar = ({ user: { image, name }, size = 50 }) => {
  return image.length > 0 ?
    <img src={image} width={size} className="rounded-circle m-1" alt="user" /> :
    <div
      className="rounded-circle border border-secondary m-1 d-flex justify-content-center align-items-center fw-bold avatar"
      style={{ width: size, height: size }}
    >
      {name.split(" ").map(v => v[0]).join("")}
    </div>
}


export default Avatar