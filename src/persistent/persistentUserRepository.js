const persistentUserRepository = {
  getUsers: () => localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []
}

export default persistentUserRepository