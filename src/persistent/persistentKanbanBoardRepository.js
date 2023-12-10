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
    const column = getColumnById(columnId)
    column.limit = limit

    updateColumn(column)
  },
  toggleMarkAsDoneColumn: columnId => {
    const column = getColumnById(columnId)
    column.markedAsDone = !column.markedAsDone

    updateColumn(column)
  },
  updateColumnTitle: (columnId, title) => {
    const column = getColumnById(columnId)
    column.title = title

    updateColumn(column)
  },
  updateColumnDescription: (columnId, description) => {
    const column = getColumnById(columnId)
    column.description = description

    updateColumn(column)
  },
  deleteColumn: columnId => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const { [columnId]: value, ...restColumns } = columns

    localStorage.setItem("columns", JSON.stringify(restColumns))
  },
  deleteAllTasksForColumn: columnId => {
    const column = getColumnById(columnId)
    column.items = []

    updateColumn(column)
  }
}

const tasks = {
  createTask: (columnId, taskTitle, taskDescription, priority, isTemplate) => {
    const id = Math.random().toString().slice(2)

    const column = getColumnById(columnId)
    column.items.push({
      id,
      title: taskTitle,
      description: taskDescription,
      assignedIds: [],
      priority,
      isLocked: false,
      isTemplate: isTemplate
    })

    updateColumn(column)
  },
  updateTask: (task, columnId) => {
    const column = getColumnById(columnId)

    const foundTask = getTaskById(column, task.id)
    foundTask.title = task.title
    foundTask.description = task.description
    foundTask.priority = task.priority
    foundTask.isTemplate = task.isTemplate

    updateColumn(column)
  },
  updateTaskLockStatus: (taskId, columnId, isLocked) => {
    const column = getColumnById(columnId)
    const task = getTaskById(column, taskId)
    task.isLocked = isLocked

    updateColumn(column)
  },
  moveTask: (fromColumnId, toColumnId, taskId) => {
    if (fromColumnId !== toColumnId) {
      const columns = JSON.parse(localStorage.getItem("columns"))

      const fromColumn = columns[fromColumnId]
      const task = getTaskById(fromColumn, taskId)

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
    const column = getColumnById(columnId)
    const task = getTaskById(column, taskId)
    task.assignedIds = assignedIds

    updateColumn(column)
  },
  removeAssignedUserFromTasks: assignedId => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    Object.values(columns).forEach(column => {
      column.items.forEach(item => {
        item.assignedIds = item.assignedIds.filter(v => v !== assignedId)
      })
    })

    localStorage.setItem("columns", JSON.stringify(columns))
  },
  deleteTask: (taskId, columnId) => {
    const column = getColumnById(columnId)
    column.items = column.items.filter(v => v.id !== taskId)

    updateColumn(column)
  }
}

const board = {
  getBoardTitle: () => {
    return localStorage.getItem("boardTitle") ?
      localStorage.getItem("boardTitle") :
      "Project Management Kanban Board"
  },
  updateBoardTitle: title => {
    localStorage.setItem("boardTitle", title)
  },
  clearBoard: () => {
    localStorage.removeItem("columns")
    localStorage.removeItem("boardTitle")
  }
}

const getColumnById = id => {
  const columns = JSON.parse(localStorage.getItem("columns"))
  return columns[id]
}

const getTaskById = (column, taskId) => column.items.find(v => v.id === taskId)

const updateColumn = column => {
  const columns = JSON.parse(localStorage.getItem("columns"))
  localStorage.setItem("columns", JSON.stringify({ ...columns, [column.id]: column }))
}

const persistentKanbanBoardRepository = {
  ...board,
  ...columns,
  ...tasks
}

export default persistentKanbanBoardRepository