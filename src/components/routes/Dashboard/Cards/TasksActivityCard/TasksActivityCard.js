import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

import { Bar } from "react-chartjs-2"
import Card from "../Card"

import boardRepository from "persistent/persistentKanbanBoardRepository"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const columns = boardRepository.getColumns()

const labels = ["Active", "Non-Active", "Completed"]

const chartData = {
  active: 0,
  nonactive: 0,
  completed: 0
}

columns.forEach(column => {
  column.items.forEach(v => {
    column.markedAsDone ?
      chartData.completed++ :
      v.isActive ? chartData.active++ : chartData.nonactive++
  })
})

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top"
    }
  }
}

const data = {
  labels,
  datasets: [
    {
      label: "Tasks Activity",
      data: Object.values(chartData),
      backgroundColor: "#80b3ce",
    }
  ],
}

const TasksActivityCard = () => (
  <Card title="Tasks Activity">
    <Bar options={options} data={data} />
  </Card>
)

export default TasksActivityCard