import usersDAO from "../dao/usersDAO.js";
import EntryValidations from './../entryValidations.js'

export default class UsersController {
  static async apiGetUserData (req, res, next) {
    const {username, password} = req.body
    const user = await usersDAO.getUserData({username, password})
    if (user){
      res.json(user)
      return
    }
    res.send({error: 'Failed! Try again with a different username and password.'})
  }
  static async apiStartQuiz(req, res, next) {
    const { username, password, quizSpecs } = req.body
    
    // validate !!!!
    const validate = EntryValidations.validateStartQuiz(quizSpecs)
    if (validate.status === 'invalid') {
      res.json({error: validate.errMsg})
      return
    }

    try {
      const response = await usersDAO.startQuiz({username, password, quizSpecs})
      if (response.error){
        res.send({error: 'Failted. You might not be authorized.'})
        return
      }
      res.status(202).send(response.questions)
    } catch(err) {
      console.error(err);
      res.json({error: "Internal Error!"})
    }    
  }
  
  static async apiSubmitAnswer (req, res, next) {
    const { username, password, answers } = req.body

    // validate !!!
    const validate = EntryValidations.validateSubmitAnswers(answers)
    if (validate.status === 'invalid') {
      res.json({error: validate.errMsg})
      return
    }

    const numberOfCorrectAnswers = await usersDAO.submitAnswers({username, password, answers})
    if (numberOfCorrectAnswers >= 0){
      res.json({numberOfCorrectAnswers})
      return
    }
    res.send({error: 'Failted. You might not be authorized.'})
  }
}