import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom"

import KanbanBoard from "components/routes/KanbanBoard"
import Tasks from "components/routes/Tasks"

const TasksRoute = () => {
  const { userId } = useParams()

  return <Tasks userId={userId} />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
        <Route path="/tasks/:userId" element={<TasksRoute />} />
      </Routes>
    </Router>
  )
}

export default App;
