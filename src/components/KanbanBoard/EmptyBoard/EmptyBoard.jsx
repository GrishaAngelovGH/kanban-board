import settingsRepository from "persistent/persistentSettingsRepository"

const EmptyBoard = () => {
  const textColor = settingsRepository.hasNatureBackground() ? "text-white" : "text-secondary"

  return (
    <div className={`row justify-content-center p-5 ${textColor}`}>
      <div className="col-12 col-lg-7 text-center">
        <i className="bi bi-folder-plus" style={{ fontSize: 150 }}></i>
        <h1>Empty Kanban Board</h1>
        <h3>You could click on the auto-generate board button <i className="bi bi-magic"></i> or add columns and tasks manually</h3>
      </div>
    </div>
  )
}

export default EmptyBoard