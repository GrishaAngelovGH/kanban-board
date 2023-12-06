import { Fragment } from "react"

import Modal from "components/Modal"

import User from "./User"

import usersRepository from "persistent/persistentUserRepository"

const Users = ({ show, onClose, onUpdate }) => {
  const users = usersRepository.getUsers()

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Manage Users"
      hideConfirm
      body={
        <Fragment>
          {
            users.map(v => (
              <User
                key={v.id}
                id={v.id}
                name={v.name}
                image={v.image}
                onUpdate={onUpdate}
              />
            ))
          }
        </Fragment>
      }
    />
  )
}

export default Users