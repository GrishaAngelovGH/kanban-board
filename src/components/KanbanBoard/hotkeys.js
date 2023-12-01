import hotkeys from "hotkeys-js"

const configureHotkeys = handlers => {
  hotkeys("ctrl+g", (event, handler) => {
    event.preventDefault()

    const keys = {
      "ctrl+g": handlers.ctrlPlusG
    }

    keys[handler.key]()
  })
}

export default configureHotkeys