import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"

const NavigationButtons = ({ className, size, onLeftClick, onRightClick }) => (
  <ButtonGroup size={size} className={className}>
    <Button
      variant="light"
      className="bi bi-arrow-left"
      onClick={onLeftClick}
    />
    <Button
      variant="light"
      className="bi bi-arrow-right"
      onClick={onRightClick}
    />
  </ButtonGroup>
)

export default NavigationButtons