const columns = {
  createColumn: (title, description) => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    const id = Math.random().toString().slice(2)

    const newColumn = JSON.stringify({
      ...columns,
      [id]: { id, title, description, limit: 0, items: [] }
    })

    localStorage.setItem("columns", newColumn)
  },
  getColumns: () => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    return (columns && Object.values(columns)) || []
  },
  getStringifiedColumns: () => {
    return localStorage.getItem("columns")
  },
  setColumnsJSON: columnsJSON => {
    localStorage.setItem("columns", JSON.stringify(columnsJSON))
  },
  setColumnLimit: (columnId, limit) => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const currentColumn = columns[columnId]
    currentColumn.limit = limit

    updateColumn(currentColumn)
  },
  toggleMarkAsDoneColumn: columnId => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const currentColumn = columns[columnId]
    currentColumn.markedAsDone = !currentColumn.markedAsDone

    updateColumn(currentColumn)
  },
  updateColumnTitle: (columnId, title) => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const currentColumn = columns[columnId]
    currentColumn.title = title

    updateColumn(currentColumn)
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

    updateColumn(currentColumn)
  }
}

const tasks = {
  createTask: (columnId, taskTitle, taskDescription, priority) => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    const id = Math.random().toString().slice(2)

    const currentColumn = columns[columnId]
    currentColumn.items.push({ id, title: taskTitle, description: taskDescription, assignedIds: [], priority })

    updateColumn(currentColumn)
  },
  updateTask: (task, columnId) => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const currentColumn = columns[columnId]

    const foundTask = currentColumn.items.find(v => v.id === task.id)
    foundTask.title = task.title
    foundTask.description = task.description
    foundTask.priority = task.priority

    updateColumn(currentColumn)
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
  assignUsersToTask: (taskId, columnId, assignedIds) => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const currentColumn = columns[columnId]
    const currentTask = currentColumn.items.find(v => v.id === taskId)
    currentTask.assignedIds = assignedIds

    updateColumn(currentColumn)
  },
  deleteTask: (taskId, columnId) => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const currentColumn = columns[columnId]
    currentColumn.items = currentColumn.items.filter(v => v.id !== taskId)

    updateColumn(currentColumn)
  }
}

const updateColumn = column => {
  const columns = JSON.parse(localStorage.getItem("columns"))
  localStorage.setItem("columns", JSON.stringify({ ...columns, [column.id]: column }))
}

const persistentKanbanBoardRepository = {
  ...columns,
  ...tasks
}

export default persistentKanbanBoardRepository