import hotkeys from "hotkeys-js"

const configureHotkeys = handlers => {
  hotkeys("ctrl+g, ctrl+i", (event, handler) => {
    event.preventDefault()

    const keys = {
      "ctrl+g": handlers.ctrlPlusG,
      "ctrl+i": handlers.ctrlPlusI
    }

    keys[handler.key]()
  })
}

export default configureHotkeys