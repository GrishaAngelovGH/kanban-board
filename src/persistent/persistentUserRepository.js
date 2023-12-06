const persistentUserRepository = {
  getUsers: () => {
    const users = JSON.parse(localStorage.getItem("users"))

    if (!users || !Object.values(users).length) return []

    return (users && Object.values(users)) || []
  },
  deleteUser: id => {
    const users = JSON.parse(localStorage.getItem("users"))

    const { [id]: userId, ...restUsers } = users

    localStorage.setItem("users", JSON.stringify(restUsers))
  }
}

export default persistentUserRepository