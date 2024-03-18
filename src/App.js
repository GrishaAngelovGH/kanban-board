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

const TasksRoute = ({ showToastWithMessage }) => {
  const { userId } = useParams()

  return <Tasks userId={userId} showToastWithMessage={showToastWithMessage} />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notification><KanbanBoard /></Notification>} />
        <Route path="/tasks/:userId" element={<Notification><TasksRoute /></Notification>} />
        <Route path="/history" element={<Notification delay={1000}><History /></Notification>} />
      </Routes>
    </Router>
  )
}

export default App;
