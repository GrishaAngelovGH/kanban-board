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
  }
}

const history = {
  ...columns,
  ...tasks
}

export default history