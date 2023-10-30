const persistentSettingsRepository = {
  saveSettings: settings => {
    localStorage.setItem("settings", JSON.stringify(settings))
  },
  getBackground: () => {
    const settings = JSON.parse(localStorage.getItem("settings"))

    return settings?.background ? settings.background : "Geometric Background"
  }
}

export default persistentSettingsRepository