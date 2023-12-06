import { useState } from "react"

const User = ({ id, name, image, selected, onSelect }) => {
  const [isSelected, setIsSelected] = useState(selected)

  const handleToggle = () => {
    setIsSelected(!isSelected)
    onSelect(!isSelected, id)
  }

  return (
    <div className="row align-items-center" onClick={handleToggle}>
      <div className="col-2">
        <img src={image} width={50} className="rounded-circle" alt="assigned-user" />
      </div>
      <div className="col-8">
        <p className="m-0 fw-bold">{name}</p>
      </div>
      <div className="col-2">
        {isSelected && (<i className="bi bi-check-circle-fill text-success fs-4"></i>)}
      </div>
    </div>
  )
}

export default User