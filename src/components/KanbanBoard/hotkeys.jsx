import hotkeys from "hotkeys-js"

const configureHotkeys = handlers => {
  hotkeys("ctrl+g, ctrl+i, ctrl+l", (event, handler) => {
    event.preventDefault()

    const keys = {
      "ctrl+g": handlers.ctrlPlusG,
      "ctrl+i": handlers.ctrlPlusI,
      "ctrl+l": handlers.ctrlPlusL
    }

    keys[handler.key]()
  })
}

export default configureHotkeys