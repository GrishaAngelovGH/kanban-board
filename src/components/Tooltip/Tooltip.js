import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

const TooltipWrapper = ({ label, children, ...restProps }) => (
  <OverlayTrigger
    placement="top"
    delay={{ show: 250, hide: 400 }}
    overlay={props => (
      <Tooltip {...props} {...restProps}>
        {label}
      </Tooltip>
    )}
  >
    {children}
  </OverlayTrigger >
)

export default TooltipWrapper