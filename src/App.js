import Layout from "./components/Layout"

function App() {
  return (
    <div className="container-fluid">
      <Layout
        header={<div>Header</div>}
        body={<div>Body</div>}
      />
    </div>
  );
}

export default App;
