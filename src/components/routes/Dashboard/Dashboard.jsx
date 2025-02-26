import { useState } from "react"

import Page from "components/routes/Page"

import Toolbar from "./Toolbar"

import TasksPerMemberCard from "./Cards/TasksPerMemberCard"
import TasksPerColumnCard from "./Cards/TasksPerColumnCard"
import TasksPerPriorityCard from "./Cards/TasksPerPriorityCard"
import TasksActivityCard from "./Cards/TasksActivityCard"

import dashboardRepository from "persistent/persistentDashboardRepository"

const Dashboard = () => {
  const [items, setItems] = useState({
    "2739616380548479": { id: "2739616380548479", title: "Tasks Per Member Card", show: false, isFavorite: dashboardRepository.isFavoriteCard("2739616380548479"), Component: TasksPerMemberCard },
    "8793129700401691": { id: "8793129700401691", title: "Tasks Per Column Card", show: false, isFavorite: dashboardRepository.isFavoriteCard("8793129700401691"), Component: TasksPerColumnCard },
    "1758635645386716": { id: "1758635645386716", title: "Tasks Per Priority Card", show: false, isFavorite: dashboardRepository.isFavoriteCard("1758635645386716"), Component: TasksPerPriorityCard },
    "7538651463334785": { id: "7538651463334785", title: "Tasks Activity Card", show: false, isFavorite: dashboardRepository.isFavoriteCard("7538651463334785"), Component: TasksActivityCard }
  })

  const handleToolbarItemClick = id => {
    const newItems = { ...items }
    newItems[id].show = true
    setItems(newItems)
  }

  const handleCardCloseClick = id => {
    const newItems = { ...items }
    newItems[id].show = false
    setItems(newItems)
  }

  const handleSaveCardAsFavorite = id => {
    dashboardRepository.saveCardAsFavorite(id)

    const newItems = { ...items }
    newItems[id].isFavorite = true
    setItems(newItems)
  }

  const handleRemoveCardAsFavorite = id => {
    dashboardRepository.removeCardAsFavorite(id)

    const newItems = { ...items }
    newItems[id].isFavorite = false
    setItems(newItems)
  }

  const showToolbar = !Object.values(items).every(v => v.show || v.isFavorite)

  const toolbarItems = Object.values(items).filter(v => !v.show && !v.isFavorite)

  const description = (
    <div className="col-10">
      <h3 className="m-0 text-center">Dashboard</h3>
    </div>
  )

  return (
    <Page description={description}>
      {
        showToolbar && (
          <Toolbar items={toolbarItems} onClick={handleToolbarItemClick} />
        )
      }
      <div className="row g-0 mt-3 justify-content-center">
        <div className="col-10">
          <div className="row mb-5 gap-5 justify-content-between">
            {
              Object.values(items)
                .filter(v => v.show || v.isFavorite)
                .map(({ id, Component }) => (
                  <Component
                    key={id}
                    id={id}
                    isFavorite={dashboardRepository.isFavoriteCard(id)}
                    onAddAsFavorite={handleSaveCardAsFavorite}
                    onRemoveAsFavorite={handleRemoveCardAsFavorite}
                    onClose={handleCardCloseClick}
                  />
                ))
            }
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Dashboard