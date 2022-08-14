import QuizDAO from "../dao/quizDAO.js";
import EntryValidations from '../entryValidations.js'

export default class QuizController {
  static async apiLoginOrGetUserData (req, res, next) {
    const {user_id, user_signature, username, email} = req.body

    // validate !!!!
    const validate = EntryValidations.validateUserIdAndSignature(user_id, user_signature)
    if (validate.status === 'invalid') {
      res.status(400).json({error: "Invalid user!"})
      return
    }

    const user = await QuizDAO.loginOrGetUserData({ user_id, username, email })
    if (user){
      res.status(200).json({user, success: true})
      return
    }
    res.status(401).send({error: 'Failed! You are not authenticated.'})
  }
  
  static async apiStartQuiz(req, res, next) {
    const { user_id, user_signature, quizSpecs } = req.body
    
    // validate !!!!
    const validateQuizSpecs = EntryValidations.validateStartQuiz(quizSpecs)
    if (validateQuizSpecs.status === 'invalid') {
      res.status(400).json({error: validateQuizSpecs.errMsg})
      return
    }

    // validate user_id (authentication) !!!!
    const validateUserID = EntryValidations.validateUserIdAndSignature(user_id, user_signature)
    if (validateUserID.status === 'invalid') {
      res.status(400).json({error: "Invalid user!"})
      return
    }

    // communicate with DAO
    try {
      const response = await QuizDAO.startQuiz({user_id, quizSpecs})
      if (response.error){
        res.status(401).send({error: 'Failted. You might not be authorized.'})
        return
      }
      res.status(200).send({questions: response.questions, success: true})
    } catch(err) {
      console.error(err);
      res.status(500).json({error: "Internal Error!"})
    }    
  }
  
  // 
  static async apiSubmitAnswer (req, res, next) {
    const { user_id, user_signature, category, answers } = req.body

    // validate SubmitAnswers action!!!
    const validate = EntryValidations.validateSubmitAnswers(answers)
    if (validate.status === 'invalid') {
      res.status(400).json({error: validate.errMsg})
      return
    }

    // validate user_id (authentication) !!!!
    const validateUserID = EntryValidations.validateUserIdAndSignature(user_id, user_signature)
    if (validateUserID.status === 'invalid') {
      res.status(400).json({error: "Invalid user!"})
      return
    }

    const numberOfCorrectAnswers = await QuizDAO.submitAnswers({user_id, category, answers})
    if (numberOfCorrectAnswers >= 0){
      res.status(200).json({numberOfCorrectAnswers, success: true})
      return
    }
    res.status(401).send({error: 'Failted. You might not be authorized.'})
  }
}