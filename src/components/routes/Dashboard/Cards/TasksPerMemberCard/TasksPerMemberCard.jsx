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

import userRepository from "persistent/persistentUserRepository"
import boardRepository from "persistent/persistentKanbanBoardRepository"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const users = userRepository.getUsers()

const labels = users.map(v => v.name)

const chartData = users.map(v => boardRepository.getColumnsWithAssignedTasksForUser(v.id).reduce((a, b) => a + b.items.length, 0))

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
      label: "Tasks Per Member",
      data: chartData,
      backgroundColor: "#80b3ce",
    }
  ],
}

const TasksPerMemberCard = ({ id, isFavorite, onAddAsFavorite, onRemoveAsFavorite, onClose }) => (
  <Card
    id={id}
    title="Tasks Per Member Card"
    isFavorite={isFavorite}
    onAddAsFavorite={onAddAsFavorite}
    onRemoveAsFavorite={onRemoveAsFavorite}
    onClose={onClose}
  >
    <Bar options={options} data={data} />
  </Card>
)

export default TasksPerMemberCard