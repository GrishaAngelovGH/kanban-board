import { useState, useRef } from "react"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"

import userRepository from "persistent/persistentUserRepository"

const fileReader = new FileReader()

const UserForm = ({ onUpdate }) => {
  const [image, setImage] = useState("")
  const [username, setUsername] = useState("")

  const imageInputRef = useRef()

  const handleImageChange = ({ target }) => {
    fileReader.readAsDataURL(target.files[0])
    fileReader.onload = e => {
      setImage(e.target.result)
    }
  }

  const handleUsernameChange = ({ target: { value } }) => {
    setUsername(value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    userRepository.createUser(image, username)

    imageInputRef.current.value = ""
    setImage("")
    setUsername("")

    onUpdate()
  }

  return (
    <div className="mt-3">
      <h3 className="text-center text-secondary bg-secondary-subtle rounded">
        Create New User
      </h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="avatar" className="mb-2">
          <Form.Label>Upload Avatar (optional)</Form.Label>
          <FormControl size="sm" ref={imageInputRef} type="file" onChange={handleImageChange} accept="image/*" />
        </Form.Group>

        <Form.Group controlId="name" className="mb-2">
          <Form.Label>Enter Name</Form.Label>
          <FormControl size="sm" value={username} onChange={handleUsernameChange} required />
        </Form.Group>

        <Button size="sm" type="submit" variant="secondary" className="w-25">Add</Button>
      </Form>
    </div>
  )
}

export default UserForm