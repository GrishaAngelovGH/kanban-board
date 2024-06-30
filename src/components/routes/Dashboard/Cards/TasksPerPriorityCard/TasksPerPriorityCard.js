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

const labels = ["No Priority", "Low", "Medium", "High"]

const chartData = {
  unprioritized: 0,
  low: 0,
  medium: 0,
  high: 0
}

columns.forEach(column => {
  column.items.forEach(v => {
    if (!v.priority.length) chartData.unprioritized++
    chartData[v.priority]++
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
      label: "Tasks Per Priority Card",
      data: Object.values(chartData),
      backgroundColor: "#80b3ce",
    }
  ],
}

const TasksPerPriorityCard = ({ id, isFavorite, onAddAsFavorite, onRemoveAsFavorite, onClose }) => (
  <Card
    id={id}
    title="Tasks Per Priority Card"
    isFavorite={isFavorite}
    onAddAsFavorite={onAddAsFavorite}
    onRemoveAsFavorite={onRemoveAsFavorite}
    onClose={onClose}
  >
    <Bar options={options} data={data} />
  </Card>
)

export default TasksPerPriorityCard