import { Fragment, useEffect, useRef } from "react"

import Modal from "components/Modal"

import User from "./User"
import UserForm from "./UserForm"

import usersRepository from "persistent/persistentUserRepository"

import "./Users.css"

const Users = ({ show, onClose, onUpdate }) => {
  const scrollRef = useRef()

  const users = usersRepository.getUsers()

  useEffect(() => {
    scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }, [users.length])

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Manage Users"
      hideConfirm
      body={
        <Fragment>
          <div className="overflow-auto users">
            {
              users.map(v => (
                <User
                  key={v.id}
                  ref={scrollRef}
                  id={v.id}
                  name={v.name}
                  image={v.image}
                  onUpdate={onUpdate}
                />
              ))
            }
          </div>

          <UserForm onUpdate={onUpdate} />
        </Fragment>
      }
    />
  )
}

export default Users