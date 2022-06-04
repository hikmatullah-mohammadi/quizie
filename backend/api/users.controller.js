import usersDAO from "../dao/usersDAO.js";

export default class UsersController {
  static async apiGetUsers (req, res, next) {
    const users = await usersDAO.getUsers()
    res.json(users)
  }
}