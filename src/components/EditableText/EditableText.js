import { useState } from "react"

import FormControl from "react-bootstrap/FormControl"

import "./EditableText.css"

const EditableText = ({ children, onBlur }) => {
  const [value, setValue] = useState(children.props.children)
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setShow(true)
  }

  const handleBlur = () => {
    setShow(false)
    onBlur(value)
  }

  const handleInputChange = ({ target }) => {
    setValue(target.value)
  }

  return (
    <div className="editable-text" onClick={handleClick} onBlur={handleBlur}>
      {!show && children}
      {show && <FormControl autoFocus value={value} onChange={handleInputChange} />}
    </div>
  )
}

export default EditableText