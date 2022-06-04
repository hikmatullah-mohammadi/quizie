let users
export default class usersDAO {
  static async injectDB(client) {
    try {
      users = await client.db('quizBackend').collection('users')
    } catch(err) {
      console.error(err);
    }
  }

  static async getUsers() {
    try {
      const usersList = await users.find().toArray()
      return usersList 
    } catch(err) {
      console.error(err)
      return
    }
  }
}