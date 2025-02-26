const TaskProgress = ({ columns, className }) => {
  const completedTasks = columns
    .filter(v => v.markedAsDone)
    .map(v => v.items.length)
    .reduce((a, b) => a + b, 0)

  const totalTasks = columns
    .map(v => v.items.length)
    .reduce((a, b) => a + b, 0)

  const percentage = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(0) : 0

  return (
    <p className={`bg-white rounded text-center p-1 ${className}`}>Completed {completedTasks} task{completedTasks > 1 || !completedTasks ? "s" : ""} of {totalTasks} ({percentage}%)</p>
  )
}

export default TaskProgress