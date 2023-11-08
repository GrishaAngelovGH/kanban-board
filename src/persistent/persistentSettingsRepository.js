const persistentSettingsRepository = {
  saveSettings: settings => {
    localStorage.setItem("settings", JSON.stringify(settings))
  },
  getBackground: () => {
    const settings = JSON.parse(localStorage.getItem("settings"))

    return settings?.background ? settings.background : "Geometric Background"
  },
  getLayout: () => {
    const settings = JSON.parse(localStorage.getItem("settings"))

    return settings?.layout ? settings.layout : "Grid View"
  },
  getColumnStyle: () => {
    const settings = JSON.parse(localStorage.getItem("settings"))

    return settings?.columnStyle ? settings.columnStyle : "Blurred"
  },
  isGridView: () => {
    const settings = JSON.parse(localStorage.getItem("settings"))

    return settings?.layout ? settings.layout === "Grid View" : true
  },
  hasNoBackground: () => {
    const settings = JSON.parse(localStorage.getItem("settings"))

    return settings?.background ? settings.background === "No Background" : false
  },
  hasNatureBackground: () => {
    const settings = JSON.parse(localStorage.getItem("settings"))

    return settings?.background ? settings.background === "Nature Background" : false
  },
  hasSolidColumnStyle: () => {
    const settings = JSON.parse(localStorage.getItem("settings"))

    return settings?.columnStyle ? settings.columnStyle === "Solid" : false
  }
}

export default persistentSettingsRepository