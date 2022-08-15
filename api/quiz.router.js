import express from 'express'
import QuizController from './quiz.controller.js'

const router = express.Router()

router.route('/user').post(QuizController.apiLoginOrGetUserData)
router.route('/start-quiz').post(QuizController.apiStartQuiz)
router.route('/submit-answers').post(QuizController.apiSubmitAnswer)

export default router