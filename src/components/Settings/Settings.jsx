import { useState } from "react"

import ListGroup from "react-bootstrap/ListGroup"

import Modal from "components/Modal"

import settingsRepository from "persistent/persistentSettingsRepository"

const Setting = ({ title, children }) => (
  <>
    <ListGroup.Item className="fw-bold bg-secondary-subtle">
      {title}
    </ListGroup.Item>
    {
      children
    }
  </>
)

const Settings = ({ show, onClose, onConfirm }) => {
  const [background, setBackground] = useState(settingsRepository.getBackground())
  const [layout, setLayout] = useState(settingsRepository.getLayout())
  const [columnStyle, setColumnStyle] = useState(settingsRepository.getColumnStyle())

  const handleBackgroundClick = ({ target }) => {
    setBackground(target.innerText)
  }

  const handleLayoutClick = ({ target }) => {
    setLayout(target.innerText)
  }

  const handleColumnStyleClick = ({ target }) => {
    setColumnStyle(target.innerText)
  }

  const handleConfim = () => {
    onConfirm({
      background,
      layout,
      columnStyle
    })
  }

  const backgrounds = ["Nature Background", "Geometric Background", "No Background"]
  const layoutOptions = [{ label: "Grid View", icon: "grid-3x3" }, { label: "Single Column", icon: "view-stacked" }, { label: "Single Row", icon: "layout-three-columns" }]
  const columnStyleOptions = ["Solid", "Blurred"]
  const keyboardShortcuts = [
    { shortcut: <span><kbd className="bg-primary">Ctrl</kbd> + <kbd className="bg-primary">G</kbd></span>, action: "auto-generate board" },
    { shortcut: <span><kbd className="bg-primary">Ctrl</kbd> + <kbd className="bg-primary">I</kbd></span>, action: "create new column" },
    { shortcut: <span><kbd className="bg-primary">Ctrl</kbd> + <kbd className="bg-primary">L</kbd></span>, action: "clear board" }
  ]

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={handleConfim}
      title="Settings"
      body={
        <ListGroup className="overflow-auto" style={{ height: 320 }}>
          <Setting title="Background">
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
          </Setting>

          <Setting title="Layout View">
            {
              layoutOptions.map((v, i) => (
                <ListGroup.Item
                  key={i}
                  action
                  onClick={handleLayoutClick}
                  className="d-flex justify-content-between align-items-center"
                  style={{ height: 50 }}
                >
                  <span><i className={`bi bi-${v.icon} me-2`}></i>{v.label}</span>
                  {v.label === layout && <i className="bi bi-check-circle-fill text-primary fs-5"></i>}
                </ListGroup.Item>
              ))
            }
          </Setting>

          <Setting title="Column Style">
            {
              columnStyleOptions.map((v, i) => (
                <ListGroup.Item
                  key={i}
                  action
                  onClick={handleColumnStyleClick}
                  className="d-flex justify-content-between align-items-center"
                  style={{ height: 50 }}
                >
                  <span>{v}</span>
                  {v === columnStyle && <i className="bi bi-check-circle-fill text-primary fs-5"></i>}
                </ListGroup.Item>
              ))
            }
          </Setting>

          <Setting title="Keyboard Shortcuts">
            {
              keyboardShortcuts.map((v, i) => (
                <ListGroup.Item key={i}>
                  Press {v.shortcut} to {v.action}
                </ListGroup.Item>
              ))
            }
          </Setting>
        </ListGroup>
      }
    />
  )
}

export default Settings