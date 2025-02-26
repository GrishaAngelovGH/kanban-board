const ActiveTasksProgress = ({ tasks }) => {
  const activeTasks = tasks.filter(v => v.isActive).length

  const totalTasks = tasks.length

  const percentage = totalTasks > 0 ? ((activeTasks / totalTasks) * 100).toFixed(0) : 0

  return (
    <p className="bg-white rounded text-center p-1">Active {activeTasks} task{activeTasks > 1 || !activeTasks ? "s" : ""} of {totalTasks} ({percentage}%)</p>
  )
}

export default ActiveTasksProgress