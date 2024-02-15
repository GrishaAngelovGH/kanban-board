import settingsRepository from "persistent/persistentSettingsRepository"

import geometricBackgroundImage from "assets/images/backgrounds/geometric-triangle-shapes-background.jpg"
import natureBackgroundImage from "assets/images/backgrounds/nature-background.jpg"

const backgrounds = {
  "Nature Background": natureBackgroundImage,
  "Geometric Background": geometricBackgroundImage
}

const useBackgroundImage = () => {
  const background = settingsRepository.getBackground()
  const backgroundImage = backgrounds[background]

  return backgroundImage
}

export default useBackgroundImage