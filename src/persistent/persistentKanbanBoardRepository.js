const persistentKanbanBoardRepository = {
  createColumn: (title, description) => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    const newColumn = JSON.stringify({
      ...columns,
      [title]: { title, description, items: [] }
    })

    localStorage.setItem("columns", newColumn)
  },
  createTask: (columnTitle, taskTitle, taskDescription) => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    const currentColumn = columns[columnTitle]
    currentColumn.items.push({ title: taskTitle, description: taskDescription })

    localStorage.setItem("columns", JSON.stringify({ ...columns, [columnTitle]: currentColumn }))
  },
  getColumns: () => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    return (columns && Object.values(columns)) || []
  },
  getTasksForColumn: columnTitle => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    return columns[columnTitle].items
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