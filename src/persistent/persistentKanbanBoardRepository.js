const persistentKanbanBoardRepository = {
  createColumn: (title, description) => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    const id = Math.random().toString().slice(2)

    const newColumn = JSON.stringify({
      ...columns,
      [id]: { id, title, description, items: [] }
    })

    localStorage.setItem("columns", newColumn)
  },
  createTask: (columnId, taskTitle, taskDescription) => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    const id = Math.random().toString().slice(2)

    const currentColumn = columns[columnId]
    currentColumn.items.push({ id, title: taskTitle, description: taskDescription })

    localStorage.setItem("columns", JSON.stringify({ ...columns, [columnId]: currentColumn }))
  },
  getColumns: () => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    return (columns && Object.values(columns)) || []
  },
  getTask: (taskId, columnId) => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    return columns[columnId].items.find(v => v.id === taskId)
  },
  updateTask: (task, columnId) => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const currentColumn = columns[columnId]

    const foundTask = currentColumn.items.find(v => v.id === task.id)
    foundTask.title = task.title
    foundTask.description = task.description

    localStorage.setItem("columns", JSON.stringify({ ...columns, [columnId]: currentColumn }))
  },
  deleteColumn: columnId => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const { [columnId]: value, ...restColumns } = columns

    localStorage.setItem("columns", JSON.stringify(restColumns))
  },
  deleteAllColumns: () => {
    localStorage.removeItem("columns")
  },
  deleteAllTasksForColumn: columnId => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const currentColumn = columns[columnId]
    currentColumn.items = []

    localStorage.setItem("columns", JSON.stringify({ ...columns, [columnId]: currentColumn }))
  },
  moveTask: (fromColumnId, toColumnId, taskId) => {
    if (fromColumnId !== toColumnId) {
      const columns = JSON.parse(localStorage.getItem("columns"))

      const fromColumn = columns[fromColumnId]
      const task = fromColumn.items.find(v => v.id === taskId)

      fromColumn.items = fromColumn.items.filter(v => v.id !== taskId)

      const toColumn = columns[toColumnId]
      toColumn.items.push(task)

      localStorage.setItem("columns", JSON.stringify({
        ...columns,
        [fromColumnId]: fromColumn,
        [toColumnId]: toColumn
      }))
    }
  },
  deleteTask: (taskId, columnId) => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const currentColumn = columns[columnId]
    currentColumn.items = currentColumn.items.filter(v => v.id !== taskId)

    localStorage.setItem("columns", JSON.stringify({ ...columns, [columnId]: currentColumn }))
  }
}

export default persistentKanbanBoardRepository