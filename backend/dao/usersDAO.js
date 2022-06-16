import data from './../data.js'
import { countTheNumberOfCorrectAnswers, decryptUserId, getQuestions, positionCorrectAnswerIndexRandomly } from './../utils.js'

let users
export default class usersDAO {
  static async injectDB(client) {
    try {
      users = await client.db('quizBackend').collection('users')
    } catch(err) {
      console.error(err);
    }
  }
  
  static async signupOrLogin({ user_id, username}) {
    // decrypt user id
    const decrypted_user_id = decryptUserId(user_id)
    const query = {_id: {$eq: decrypted_user_id}}
    const defaultDoc = {
      numberOfQuizes: 0,
      totalNumberOfQuestions: 0,
      totalQuestionsAnsweredCorrectly: 0,
      categories: [],
      lastQuestionsList: []
    }
    try {
      const user = await users.findOne(query)
      if (user) {
        delete user.lastQuestionsList
        return user
      } else {
        await users.insertOne({
          _id: decrypted_user_id,
          username,
          ...defaultDoc
        })
        return await users.findOne(query)
      }
    } catch(err) {
      console.error(err)
      return
    }
  }
  static async getUserData({username, password}) {
  }

  static async startQuiz({username, password, quizSpecs }) {
    // TODO: call the api here
    // const { data } = await getQuestions(quizSpecs)    

    // put correct answer and incorrect answers together in an array
    const questions = data.slice(0, quizSpecs.numberOfQuestions).map(q => ({
      ...q,
      answers: [q.correctAnswer, ...q.incorrectAnswers]
    }))

    // position the correct answer its (random) index
    const questionsWithRandomCorrectAnsIndex = questions.map(q => ({
      ...q,
      answers: positionCorrectAnswerIndexRandomly(q.answers)
    }))
    
    // update the database
    const query = { $and: [{username: {$eq: username}}, {password: {$eq: password}}] }
    try {
      const { numberOfQuizes, totalNumberOfQuestions, categories } = await users.findOne(query)
      const updateResponse = await users.updateOne(query, {
        $set: {
          totalNumberOfQuestions: totalNumberOfQuestions + parseInt(quizSpecs.numberOfQuestions),
          categories: !categories.includes(quizSpecs.category) ? [...categories, quizSpecs.category] : categories,
          numberOfQuizes: numberOfQuizes + 1,
          lastQuestionsList: questionsWithRandomCorrectAnsIndex
        }
      })
      if (updateResponse.modifiedCount > 0) {
        return { questions: questionsWithRandomCorrectAnsIndex }
      }
      return {error: 'Failed! You may not be authorized.'}
    } catch(err) {
      console.error(err);
      return
    }
  }
  
  static async submitAnswers({username, password, answers }) {
    const query = { $and: [{username: {$eq: username}}, {password: {$eq: password}}]}
    const { totalQuestionsAnsweredCorrectly: nOfCA } = await users.findOne(query)
    const {lastQuestionsList} = await users.findOne(query)
    const numberOfCorrectAnswers = countTheNumberOfCorrectAnswers(lastQuestionsList, answers)
    const newValues = {$set:
      {
        totalQuestionsAnsweredCorrectly: nOfCA + numberOfCorrectAnswers,
        lastQuestionsList: []
      }
    }
    const response = await users.updateOne(query, newValues)
    if (response.modifiedCount > 0){
      return numberOfCorrectAnswers
    }
    return
  }
}