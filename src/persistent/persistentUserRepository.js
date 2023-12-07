const persistentUserRepository = {
  createUser: (image, name) => {
    const users = JSON.parse(localStorage.getItem("users"))
    const id = Math.random().toString().slice(2)

    const newUsers = {
      ...users,
      [id]: { id, name, image }
    }

    localStorage.setItem("users", JSON.stringify(newUsers))
  },
  getUsers: () => {
    const users = JSON.parse(localStorage.getItem("users"))

    return (users && Object.values(users)) || []
  },
  deleteUser: id => {
    const users = JSON.parse(localStorage.getItem("users"))

    const { [id]: userId, ...restUsers } = users

    localStorage.setItem("users", JSON.stringify(restUsers))
  }
}

export default persistentUserRepository