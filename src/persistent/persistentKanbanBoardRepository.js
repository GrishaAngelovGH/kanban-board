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
  },
  deleteColumn: title => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const { [title]: value, ...restColumns } = columns

    localStorage.setItem("columns", JSON.stringify(restColumns))
  },
  deleteAllColumns: () => {
    localStorage.removeItem("columns")
  }
}

export default persistentKanbanBoardRepository