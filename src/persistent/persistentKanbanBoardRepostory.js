const persistentKanbanBoardRepository = {
  createColumn: (title, description) => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    const newColumn = JSON.stringify({
      ...columns,
      [title]: { title, description, items: [] }
    })

    localStorage.setItem("columns", newColumn)
  },
  getColumns: () => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    return (columns && Object.values(columns)) || []
  }
}

export default persistentKanbanBoardRepository