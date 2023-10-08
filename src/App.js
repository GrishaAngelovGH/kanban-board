import Layout from "components/Layout"
import Header from "components/Header"

function App() {
  return (
    <div className="container-fluid">
      <Layout
        header={<Header />}
        body={<div>Body</div>}
      />
    </div>
  );
}

export default App;
