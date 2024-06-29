const persistentDashboardRepository = {
  saveCardAsFavorite: function (id) {
    const dashboardCards = this.getFavoriteCards()
    dashboardCards.push(id)
    window.localStorage.setItem("dashboardCards", JSON.stringify(dashboardCards))
  },
  getFavoriteCards: function () {
    const cards = window.localStorage.getItem("dashboardCards") || "[]"
    return JSON.parse(cards)
  },
  isFavoriteCard: function (id) {
    const dashboardCards = this.getFavoriteCards()
    return dashboardCards.includes(id)
  },
  removeCardAsFavorite: function (id) {
    const dashboardCards = this.getFavoriteCards()
    const newDashboardCards = dashboardCards.filter(v => v !== id)
    window.localStorage.setItem("dashboardCards", JSON.stringify(newDashboardCards))
  }
}

export default persistentDashboardRepository