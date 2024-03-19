const historyItem = JSON.parse(localStorage.getItem("history"))

if (!historyItem) {
  localStorage.setItem("history", JSON.stringify({}))
}

const columns = {
  pushColumn: column => {
    if (column.items.length) {
      const history = JSON.parse(localStorage.getItem("history"))

      column.assignedIds = []

      column.items.forEach(v => {
        v.assignedIds = []
      })

      history[column.id] = column
      localStorage.setItem("history", JSON.stringify(history))
    }
  },
  getColumns: () => {
    const history = JSON.parse(localStorage.getItem("history"))
    return Object.values(history)
  },
  getStringifiedColumns: () => {
    return localStorage.getItem("history")
  },
  setColumnsJSON: historyJSON => {
    localStorage.setItem("history", JSON.stringify(historyJSON))
  },
  restoreColumn: id => {
    const history = JSON.parse(localStorage.getItem("history"))
    const columns = JSON.parse(localStorage.getItem("columns"))
    const currentColumn = history[id]

    if (!columns[id]) {
      columns[id] = currentColumn
    } else {
      columns[id].items = columns[id].items.concat(currentColumn.items)
    }

    const { [id]: column, ...restHistory } = history

    localStorage.setItem("history", JSON.stringify(restHistory))
    localStorage.setItem("columns", JSON.stringify(columns))
  },
  deleteColumn: id => {
    const history = JSON.parse(localStorage.getItem("history"))
    const { [id]: column, ...restHistory } = history
    localStorage.setItem("history", JSON.stringify(restHistory))
  }
}

const tasks = {
  pushTask: (column, taskId) => {
    const history = JSON.parse(localStorage.getItem("history"))

    if (!history[column.id]) {
      const newColumn = { ...column }
      newColumn.items = []
      history[column.id] = newColumn
    }

    const task = column.items.find(v => v.id === taskId)
    task.assignedIds = []

    history[column.id].items.push(task)

    localStorage.setItem("history", JSON.stringify(history))
  },
  restoreTask: (taskId, columnId) => {
    const columns = JSON.parse(localStorage.getItem("columns"))
    const history = JSON.parse(localStorage.getItem("history"))
    const currentColumn = history[columnId]

    const task = currentColumn.items.find(v => v.id === taskId)

    if (!columns[columnId]) {
      const newColumn = { ...currentColumn }
      newColumn.items = []
      columns[columnId] = newColumn
    }

    columns[columnId].items.push(task)

    currentColumn.items = currentColumn.items.filter(v => v.id !== taskId)

    if (!currentColumn.items.length) {
      const { [columnId]: column, ...restHistory } = history
      localStorage.setItem("history", JSON.stringify(restHistory))
    } else {
      localStorage.setItem("history", JSON.stringify(history))
    }

    localStorage.setItem("columns", JSON.stringify(columns))
  },
  deleteTask: (taskId, columnId) => {
    const history = JSON.parse(localStorage.getItem("history"))
    history[columnId].items = history[columnId].items.filter(v => v.id !== taskId)
    localStorage.setItem("history", JSON.stringify(history))
  }
}

const history = {
  ...columns,
  ...tasks
}

export default history