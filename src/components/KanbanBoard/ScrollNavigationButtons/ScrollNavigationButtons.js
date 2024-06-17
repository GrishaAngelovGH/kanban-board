import { forwardRef } from "react"

import NavigationButtons from "components/KanbanBoard/NavigationButtons"

const ScrollNavigationButtons = forwardRef((_, ref) => (
  <NavigationButtons
    size="sm"
    className="mt-3 ms-5"
    onLeftClick={() => {
      ref.current.scrollLeft -= 100
    }}
    onRightClick={() => {
      ref.current.scrollLeft += 100
    }}
  />
))

export default ScrollNavigationButtons