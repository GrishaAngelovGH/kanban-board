import { useState } from "react"

import Avatar from "components/Avatar"

const User = ({ id, name, image, selected, onSelect }) => {
  const [isSelected, setIsSelected] = useState(selected)

  const handleToggle = () => {
    setIsSelected(!isSelected)
    onSelect(!isSelected, id)
  }

  return (
    <div className="row align-items-center" onClick={handleToggle}>
      <div className="col-2">
        <Avatar user={{ image, name }} />
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