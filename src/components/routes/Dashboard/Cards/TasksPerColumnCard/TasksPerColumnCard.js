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

const labels = columns.map(v => v.title)

const chartData = columns.map(v => v.items.length)

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
      label: "Tasks Per Column Card",
      data: chartData,
      backgroundColor: "#80b3ce",
    }
  ],
}

const TasksPerColumnCard = () => (
  <Card title="Tasks Per Column Card">
    <Bar options={options} data={data} />
  </Card>
)

export default TasksPerColumnCard