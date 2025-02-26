import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom"

import Notification from "components/Notification"
import KanbanBoard from "components/routes/KanbanBoard"
import Tasks from "components/routes/Tasks"
import Dashboard from "components/routes/Dashboard"
import History from "components/routes/History"
import TaskDependencies from "components/routes/TaskDependencies"

const TasksRoute = ({ showToastWithMessage }) => {
  const { userId } = useParams()

  return (
    <Tasks
      userId={userId}
      showToastWithMessage={showToastWithMessage}
    />
  )
}

const TaskDependenciesRoute = ({ showToastWithMessage }) => {
  const { columnId, taskId } = useParams()

  return (
    <TaskDependencies columnId={columnId} taskId={taskId} showToastWithMessage={showToastWithMessage} />
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notification><KanbanBoard /></Notification>} />
        <Route path="/tasks/:userId" element={<Notification><TasksRoute /></Notification>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<Notification delay={1000}><History /></Notification>} />
        <Route path="/task/:columnId/:taskId/dependencies" element={<Notification delay={1000}><TaskDependenciesRoute /></Notification>} />
      </Routes>
    </Router>
  )
}

export default App;
