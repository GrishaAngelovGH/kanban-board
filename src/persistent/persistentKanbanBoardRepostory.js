const persistentKanbanBoardRepository = {
  createColumn: (title, description) => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    const newColumn = JSON.stringify({
      ...columns,
      [title]: { title, description, items: [] }
    })

    localStorage.setItem("columns", newColumn)
  },
  deleteColumn: title => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const { [title]: value, ...restColumns } = columns

    localStorage.setItem("columns", JSON.stringify(restColumns))
  },
  getColumns: () => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    return (columns && Object.values(columns)) || []
  }
}

export default persistentKanbanBoardRepository