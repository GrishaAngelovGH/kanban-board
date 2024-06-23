import Page from "components/routes/Page"

import TasksPerMemberCard from "./Cards/TasksPerMemberCard"
import TasksPerColumnCard from "./Cards/TasksPerColumnCard"
import TasksPerPriorityCard from "./Cards/TasksPerPriorityCard"

const Dashboard = () => {
  const description = (
    <div className="col-10">
      <h3 className="m-0 text-center">Dashboard</h3>
    </div>
  )

  return (
    <Page description={description}>
      <div className="row g-0 mt-3 justify-content-center overflow-auto tasks">
        <div className="col-10">
          <div className="row mb-5 gap-5 justify-content-between">
            <TasksPerMemberCard />
            <TasksPerColumnCard />
          </div>
          <div className="row mb-5 gap-5 justify-content-between">
            <TasksPerPriorityCard />
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Dashboard