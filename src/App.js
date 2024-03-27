import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom"

import Notification from "components/Notification"
import KanbanBoard from "components/routes/KanbanBoard"
import Tasks from "components/routes/Tasks"
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

const TaskDependenciesRoute = () => {
  const { columnId, taskId } = useParams()

  return (
    <TaskDependencies columnId={columnId} taskId={taskId} />
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notification><KanbanBoard /></Notification>} />
        <Route path="/tasks/:userId" element={<Notification><TasksRoute /></Notification>} />
        <Route path="/history" element={<Notification delay={1000}><History /></Notification>} />
        <Route path="/task/:columnId/:taskId/dependencies" element={<TaskDependenciesRoute />} />
      </Routes>
    </Router>
  )
}

export default App;
