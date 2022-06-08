import usersDAO from "../dao/usersDAO.js";

export default class UsersController {
  static async apiGetUserData (req, res, next) {
    const {username, password} = req.body
    const users = await usersDAO.getUserData({username, password})
    res.json(users)
  }
  static async apiStartQuiz(req, res, next) {
    const { username, password, numberOfQuestions, category } = req.body
    
    try {
      const response = await usersDAO.startQuiz({username, password, numberOfQuestions, category})
      res.status(202).send(response)
    } catch(err) {
      console.error(err);
      res.json({error: "Internal Error!"})
    }    
  }
  
  static async apiSubmitAnswer (req, res, next) {
    const { username, password, numberOfCorrectAnswers } = req.body
    const response = await usersDAO.submitAnswers({username, password, numberOfCorrectAnswers})
    res.json(response)
  }
}