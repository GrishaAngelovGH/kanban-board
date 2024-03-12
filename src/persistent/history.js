const historyItem = JSON.parse(localStorage.getItem("history"))

if (!historyItem) {
  localStorage.setItem("history", JSON.stringify("{}"))
}

const history = {
  pushColumn: column => {
    if (column.items.length) {
      const history = JSON.parse(localStorage.getItem("history"))

      if (history) {
        history[column.id] = column
        localStorage.setItem("history", JSON.stringify(history))
      }
    }
  },

  pushTask: (column, taskId) => {
    const history = JSON.parse(localStorage.getItem("history"))

    if (!history[column.id]) {
      const newColumn = { ...column }
      newColumn.items = []
      history[column.id] = newColumn
    }

    const task = column.items.filter(v => v.id === taskId)
    history[column.id].items.push(task)
    localStorage.setItem("history", JSON.stringify(history))
  }
}

export default history