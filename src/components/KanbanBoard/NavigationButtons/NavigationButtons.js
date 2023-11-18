import { forwardRef } from "react"

import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"

const NavigationButtons = forwardRef((_, ref) => (
  <ButtonGroup className="mt-3 ms-5">
    <Button
      variant="light"
      className="bi bi-arrow-left"
      onClick={() => {
        ref.current.scrollLeft -= 100
      }}
    />
    <Button
      variant="light"
      className="bi bi-arrow-right"
      onClick={() => {
        ref.current.scrollLeft += 100
      }}
    />
  </ButtonGroup>
))

export default NavigationButtons