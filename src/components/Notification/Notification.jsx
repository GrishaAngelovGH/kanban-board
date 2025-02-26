import React from "react"

import { useState } from "react"

import Toast from "components/Toast"

import ToastContainer from "react-bootstrap/ToastContainer"

const Notification = ({ delay, children }) => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const showToastWithMessage = message => {
    setToastMessage(message)
    setShowToast(true)
  }

  return (
    <>
      <ToastContainer position="top-center">
        <Toast show={showToast} delay={delay} title="Kanban Board" body={toastMessage} onClose={() => setShowToast(false)} />
      </ToastContainer>
      {React.cloneElement(children, { showToastWithMessage })}
    </>
  )
}

export default Notification