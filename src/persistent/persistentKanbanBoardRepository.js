import history from "./history"

const getTaskById = (column, taskId) => column.items.find(v => v.id === taskId)

const columns = {
  createColumn: (title, description) => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    const id = Math.random().toString().slice(2)

    const newColumn = JSON.stringify({
      ...columns,
      [id]: { id, title, description, limit: 0, assignedIds: [], items: [] }
    })

    localStorage.setItem("columns", newColumn)
  },
  relocateTemplatesInColumn: () => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    const id = "template-column"

    const column = columns[id] ?
      columns[id] :
      {
        id,
        title: "Templates",
        description: "This column provides all available templates",
        limit: 0,
        assignedIds: [],
        items: []
      }

    column.items = tasks.getAllTemplates()

    Object.values(columns).forEach(col => {
      if (col.id !== id) {
        col.items = col.items.filter(v => !v.isTemplate)
      }
    })

    const newColumn = JSON.stringify({
      ...columns,
      [id]: column
    })

    localStorage.setItem("columns", newColumn)
  },
  getColumns: () => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const priority = localStorage.getItem("priority") || ""
    const searchCriteria = localStorage.getItem("searchCriteria") || ""

    if (!columns) return []

    return Object.values(columns).map(column => {
      column.items = column.items
        .filter(v => {
          const { title, description } = v
          return JSON.stringify({ title, description }).toLowerCase().includes(searchCriteria.toLowerCase())
        })
        .filter(v => priority.length ? v.priority === priority.toLowerCase() : v)
      return column
    })
  },
  getColumnsWithAssignedTasksForUser: userId => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    if (!columns) return []

    return Object.values(columns)
      .filter(v => v.items.find(item => item.assignedIds.includes(userId)))
      .map(v => ({
        ...v,
        items: v.items.filter(item => item.assignedIds.includes(userId))
      }))
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
  assignUsersToColumn: (columnId, assignedIds) => {
    const column = getColumnById(columnId)
    column.assignedIds = assignedIds

    column.items.forEach(v => {
      v.assignedIds = [
        ...new Set(v.assignedIds.concat(assignedIds))
      ]
    })

    updateColumn(column)
  },
  removeAssignedUserFromColumns: assignedId => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    if (columns) {
      Object.values(columns).forEach(column => {
        column.assignedIds = column.assignedIds.filter(v => v !== assignedId)
      })

      localStorage.setItem("columns", JSON.stringify(columns))
    }
  },
  swapColumn: (id, swapWithPrev) => {
    const columns = Object.values(JSON.parse(localStorage.getItem("columns")))

    if (columns.length > 1) {
      swapObjectsInCollection(columns, id, swapWithPrev)

      const cols = columns.reduce((a, b) => { a[b.id] = b; return a }, {})

      localStorage.setItem("columns", JSON.stringify(cols))
    }
  },
  deleteColumn: columnId => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const { [columnId]: column, ...restColumns } = columns

    history.pushColumn(column)

    localStorage.setItem("columns", JSON.stringify(restColumns))
  },
  deleteEmptyColumns: () => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    const newColumns = Object.values(columns)
      .filter(v => v.items.length)
      .reduce((a, b) => { a[b.id] = b; return a }, {})

    localStorage.setItem("columns", JSON.stringify(newColumns))
  },
  deleteAllTasksForColumn: columnId => {
    const column = getColumnById(columnId)

    history.pushColumn(column)

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
      assignedIds: !isTemplate && column.assignedIds.length > 0 ? column.assignedIds : [],
      dependencyTasksIds: [],
      priority,
      isLocked: false,
      active: false,
      isTemplate: isTemplate
    })

    updateColumn(column)
  },
  getTaskById,
  getAllTemplates: () => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    return (columns && Object.values(columns).reduce(((filtered, column) => {
      const templates = column.items.filter(v => v.isTemplate)
      return [...filtered, ...templates]
    }), [])) || []
  },
  getDependencyTasks: (taskId, columnId) => {
    const column = getColumnById(columnId)
    const task = getTaskById(column, taskId)

    return task.dependencyTasksIds.map(v => getTaskById(
      getColumnById(v.columnId),
      v.taskId
    ))
  },
  isDependencyTask: taskId => {
    const columns = Object.values(JSON.parse(localStorage.getItem("columns")))

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i]

      for (let j = 0; j < column.items.length; j++) {
        const task = column.items[j]

        if (task.dependencyTasksIds.find(v => v.taskId === taskId)) {
          return true
        }
      }
    }

    return false
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
  toggleTaskActiveStatus: (taskId, columnId, optIsActive) => {
    const column = getColumnById(columnId)
    const task = getTaskById(column, taskId)
    task.isActive = optIsActive === undefined ? !task.isActive : optIsActive

    updateColumn(column)
  },
  moveTask: (fromColumnId, toColumnId, taskId) => {
    if (fromColumnId !== toColumnId) {
      const columns = JSON.parse(localStorage.getItem("columns"))

      const fromColumn = columns[fromColumnId]
      const task = getTaskById(fromColumn, taskId)

      fromColumn.items = fromColumn.items.filter(v => v.id !== taskId)

      const toColumn = columns[toColumnId]

      if (task.dependencyTasksIds.length > 0 && toColumn.markedAsDone) {
        return false
      }

      if (toColumn.markedAsDone) {
        task.isActive = false
      }

      if (toColumn.assignedIds.length) {
        task.assignedIds = [
          ...new Set(task.assignedIds.concat(toColumn.assignedIds))
        ]
      }

      toColumn.items.push(task)

      localStorage.setItem("columns", JSON.stringify({
        ...columns,
        [fromColumnId]: fromColumn,
        [toColumnId]: toColumn
      }))

      localStorage.removeItem("priority")
      return true
    }
  },
  swapTask: (taskId, columnId, swapWithPrev) => {
    const column = getColumnById(columnId)

    if (column.items.length > 1) {
      swapObjectsInCollection(column.items, taskId, swapWithPrev)

      updateColumn(column)
    }
  },
  assignUsersToTask: (taskId, columnId, assignedIds) => {
    const column = getColumnById(columnId)
    const task = getTaskById(column, taskId)
    task.assignedIds = assignedIds

    updateColumn(column)
  },
  addDependencyTask: (taskId, columnId, dependencyTaskId, dependencyColumnId) => {
    const column = getColumnById(columnId)
    const task = getTaskById(column, taskId)

    task.dependencyTasksIds.push({ taskId: dependencyTaskId, columnId: dependencyColumnId })
    updateColumn(column)
  },
  removeAssignedUserFromTasks: assignedId => {
    const columns = JSON.parse(localStorage.getItem("columns"))

    if (columns) {
      Object.values(columns).forEach(column => {
        column.items.forEach(item => {
          item.assignedIds = item.assignedIds.filter(v => v !== assignedId)
        })
      })

      localStorage.setItem("columns", JSON.stringify(columns))
    }
  },
  removeAssignedUserFromTask: (taskId, columnId, userId) => {
    const column = getColumnById(columnId)

    const task = column.items.find(v => v.id === taskId)

    task.assignedIds = task.assignedIds.filter(v => v !== userId)

    updateColumn(column)
  },
  removeDependencyTask: (taskId, columnId, dependencyTaskId) => {
    const column = getColumnById(columnId)
    const task = getTaskById(column, taskId)
    task.dependencyTasksIds = task.dependencyTasksIds.filter(v => v.taskId !== dependencyTaskId)
    updateColumn(column)
  },
  deleteTask: (taskId, columnId) => {
    const column = getColumnById(columnId)

    history.pushTask(column, taskId)

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
  applyPriorityFilter: priority => {
    priority === "All" ?
      localStorage.removeItem("priority") :
      localStorage.setItem("priority", priority)
  },
  applySearchFilter: searchCriteria => {
    if (!searchCriteria.length) {
      localStorage.removeItem("searchCriteria")
    }

    localStorage.setItem("searchCriteria", searchCriteria)
  },
  getPriorityFilter: () => localStorage.getItem("priority"),
  getSearchFilter: () => localStorage.getItem("searchCriteria"),
  clearFilters: () => {
    localStorage.removeItem("priority")
    localStorage.removeItem("searchCriteria")
  },
  clearBoard: () => {
    localStorage.removeItem("columns")
    localStorage.removeItem("priority")
    localStorage.removeItem("searchCriteria")
    localStorage.removeItem("boardTitle")
    localStorage.setItem("history", JSON.stringify({}))
  }
}

const getColumnById = id => {
  const columns = JSON.parse(localStorage.getItem("columns"))
  return columns[id]
}

const updateColumn = column => {
  const columns = JSON.parse(localStorage.getItem("columns"))
  localStorage.setItem("columns", JSON.stringify({ ...columns, [column.id]: column }))
}

const swapObjectsInCollection = (collection, id, swapWithPrev) => {
  const currentElement = collection.find(v => v.id === id)
  const currentIndex = collection.indexOf(currentElement)

  const swapFirstElementWithPrev = (currentIndex === 0) && swapWithPrev
  const swapFistElementWithNext = (currentIndex === 0) && !swapWithPrev

  const swapInnerElementWithPrev = (currentIndex > 0 && currentIndex < collection.length - 1) && swapWithPrev
  const swapInnerElementWithNext = (currentIndex > 0 && currentIndex < collection.length - 1) && !swapWithPrev

  const swapLastElementWithPrev = (currentIndex === collection.length - 1) && swapWithPrev
  const swapLastElementWithNext = (currentIndex === collection.length - 1) && !swapWithPrev

  const swapElementWithPrev = swapLastElementWithPrev || swapInnerElementWithPrev
  const swapElementWithNext = swapFistElementWithNext || swapInnerElementWithNext

  swapFirstElementWithPrev && (
    [collection[currentIndex], collection[collection.length - 1]] = [collection[collection.length - 1], collection[currentIndex]]
  )

  swapElementWithNext && (
    [collection[currentIndex], collection[currentIndex + 1]] = [collection[currentIndex + 1], collection[currentIndex]]
  )

  swapElementWithPrev && (
    [collection[currentIndex], collection[currentIndex - 1]] = [collection[currentIndex - 1], collection[currentIndex]]
  )

  swapLastElementWithNext && (
    [collection[currentIndex], collection[0]] = [collection[0], collection[currentIndex]]
  )
}

const persistentKanbanBoardRepository = {
  ...board,
  ...columns,
  ...tasks
}

export default persistentKanbanBoardRepository