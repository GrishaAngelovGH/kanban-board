import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import KanbanBoard from "components/routes/KanbanBoard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
      </Routes>
    </Router>
  )
}

export default App;
