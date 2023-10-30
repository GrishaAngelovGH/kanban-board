import { useState } from "react"

import ListGroup from "react-bootstrap/ListGroup"

import Modal from "components/Modal"

import settingsRepository from "persistent/persistentSettingsRepository"

const Settings = ({ show, onClose, onConfirm }) => {
  const [background, setBackground] = useState(settingsRepository.getBackground())

  const handleBackgroundClick = ({ target }) => {
    setBackground(target.innerText)
  }

  const handleConfim = () => {
    onConfirm({
      background
    })
  }

  const backgrounds = ["Nature Background", "Geometric Background", "No Background"]

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={handleConfim}
      title="Settings"
      body={
        <ListGroup>
          <ListGroup.Item className="fw-bold bg-secondary-subtle">
            Background
          </ListGroup.Item>
          {
            backgrounds.map((v, i) => (
              <ListGroup.Item
                key={i}
                action
                onClick={handleBackgroundClick}
                className="d-flex justify-content-between align-items-center"
                style={{ height: 50 }}
              >
                <span>{v}</span>
                {v === background && <i className="bi bi-check-circle-fill text-primary fs-5"></i>}
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      }
    />
  )
}

export default Settings