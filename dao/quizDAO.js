import { countTheNumberOfCorrectAnswers, decryptUserId, getQuestions, positionCorrectAnswerIndexRandomly } from '../utils.js'

let users
export default class QuizDAO {
  static async injectDB(client) {
    try {
      users = await client.db('quizie').collection('users')
    } catch(err) {
      console.error(err);
    }
  }
  
  static async loginOrGetUserData({ user_id, username, email}) {
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
          email,
          ...defaultDoc
        })
        return await users.findOne(query)
      }
    } catch(err) {
      console.error(err)
      return
    }
  }

  static async startQuiz({user_id, quizSpecs }) {
    // TODO: call the api here
    const { data } = await getQuestions(quizSpecs)    

    // put correct answer and incorrect answers together in an array
    const questions = data.map(q => ({
      ...q,
      answers: [q.correctAnswer, ...q.incorrectAnswers]
    }))

    // position the correct answer its (random) index
    const questionsWithRandomCorrectAnsIndex = questions.map(q => ({
      ...q,
      answers: positionCorrectAnswerIndexRandomly(q.answers)
    }))
    
    // decrypt user id
    const decrypted_user_id = decryptUserId(user_id)
    // update the database
    const query = {_id: {$eq: decrypted_user_id}}
    try {
      const { categories } = await users.findOne(query)
      const updateResponse = await users.updateOne(query, {
        $inc: {totalNumberOfQuestions: parseInt(quizSpecs.numberOfQuestions), numberOfQuizes: 1},
        $set: {
          // update categories or add a new category
          categories: categories.findIndex(item => item.title === quizSpecs.category) > -1 ? 
            categories.map(item => item.title === quizSpecs.category ? {...item, questions: item.questions + parseInt(quizSpecs.numberOfQuestions)} : item) :
            [...categories, {
              title: quizSpecs.category,
              questions: parseInt(quizSpecs.numberOfQuestions),
              correctAnswers: 0
            }],
          lastQuestionsList: questionsWithRandomCorrectAnsIndex,
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
  
  static async submitAnswers({user_id, category, answers }) {
    // decrypt user id
    const decrypted_user_id = decryptUserId(user_id)
    
    // update db
    const query = {_id: {$eq: decrypted_user_id}}
   
    const {lastQuestionsList, categories} = await users.findOne(query)
    const numberOfCorrectAnswers = countTheNumberOfCorrectAnswers(lastQuestionsList, answers)
    
    const newValues = {
      $inc: {totalQuestionsAnsweredCorrectly: numberOfCorrectAnswers},
      $set:{
        categories: categories.map(item => item.title ===  category ? (
            {...item, correctAnswers: item.correctAnswers + numberOfCorrectAnswers }
          ) : item ),
        lastQuestionsList: [],
      }
    }
    const response = await users.updateOne(query, newValues)
    if (response.modifiedCount > 0){
      return numberOfCorrectAnswers
    }
    return
  }
}