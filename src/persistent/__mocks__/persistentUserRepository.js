const users = {
  1: { id: 1, name: "John Smith", image: "image_1" },
  2: { id: 2, name: "Jane Smith", image: "image_2" }
}

const persistentUserRepository = {
  getUsers: () => Object.values(users),
  findUserById: id => users[id]
}

export default persistentUserRepository