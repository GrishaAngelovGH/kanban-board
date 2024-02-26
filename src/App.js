import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom"

import Notification from "components/Notification"
import KanbanBoard from "components/routes/KanbanBoard"
import Tasks from "components/routes/Tasks"

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
      </Routes>
    </Router>
  )
}

export default App;
