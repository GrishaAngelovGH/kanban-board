import { useState } from "react"

import Modal from "components/Modal"

const fileReader = new FileReader()

const UploadBoardModal = ({ show, onClose, onConfirm }) => {
  const [value, setValue] = useState("")

  const handleChange = ({ target }) => {
    fileReader.readAsText(target.files[0], "UTF-8")
    fileReader.onload = e => {
      setValue(e.target.result)
    }
  }

  const handleConfirm = () => {
    onConfirm(JSON.parse(value))
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Upload Kanban Board"
      body={
        <input id="file" type="file" className="form-control" onChange={handleChange} />
      }
    />
  )
}

export default UploadBoardModal