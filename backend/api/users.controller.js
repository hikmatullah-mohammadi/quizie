import usersDAO from "../dao/usersDAO.js";
import EntryValidations from './../entryValidations.js'

export default class UsersController {
  static async apiLoginOrGetUserData (req, res, next) {
    const {user_id, user_signature, username} = req.body

    // validate !!!!
    const validate = EntryValidations.validateUserIdAndSignature(user_id, user_signature)
    if (validate.status === 'invalid') {
      res.json({error: "Invalid user!"})
      return
    }

    const user = await usersDAO.loginOrGetUserData({ user_id, username})
    if (user){
      res.json(user)
      return
    }
    res.send({error: 'Failed! You are not authenticated.'})
  }
  
  static async apiStartQuiz(req, res, next) {
    const { user_id, user_signature, quizSpecs } = req.body
    
    // validate !!!!
    const validateQuizSpecs = EntryValidations.validateStartQuiz(quizSpecs)
    if (validateQuizSpecs.status === 'invalid') {
      res.json({error: validateQuizSpecs.errMsg})
      return
    }

    // validate user_id (authentication) !!!!
    const validateUserID = EntryValidations.validateUserIdAndSignature(user_id, user_signature)
    if (validateUserID.status === 'invalid') {
      res.json({error: "Invalid user!"})
      return
    }

    // communicate with DAO
    try {
      const response = await usersDAO.startQuiz({user_id, quizSpecs})
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
  
  // 
  static async apiSubmitAnswer (req, res, next) {
    const { user_id, user_signature, answers } = req.body

    // validate SubmitAnswers action!!!
    const validate = EntryValidations.validateSubmitAnswers(answers)
    if (validate.status === 'invalid') {
      res.json({error: validate.errMsg})
      return
    }

    // validate user_id (authentication) !!!!
    const validateUserID = EntryValidations.validateUserIdAndSignature(user_id, user_signature)
    if (validateUserID.status === 'invalid') {
      res.json({error: "Invalid user!"})
      return
    }

    const numberOfCorrectAnswers = await usersDAO.submitAnswers({user_id, answers})
    if (numberOfCorrectAnswers >= 0){
      res.json({numberOfCorrectAnswers})
      return
    }
    res.send({error: 'Failted. You might not be authorized.'})
  }
}