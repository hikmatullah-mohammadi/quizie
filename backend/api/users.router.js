import express from 'express'
import UsersController from './users.controller.js'

const router = express.Router()

router.route('/user').post(UsersController.apiGetUserData)
router.route('/start-quiz').post(UsersController.apiStartQuiz)
router.route('/submit-answers').post(UsersController.apiSubmitAnswer)

export default router