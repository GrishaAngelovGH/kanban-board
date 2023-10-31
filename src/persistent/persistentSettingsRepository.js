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
  }
}

export default persistentSettingsRepository