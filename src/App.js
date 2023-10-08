import Layout from "components/Layout"
import Header from "components/Header"
import KanbanBoard from "components/KanbanBoard"

function App() {
  return (
    <div className="container-fluid">
      <Layout
        header={<Header />}
        body={<KanbanBoard />}
      />
    </div>
  );
}

export default App;
