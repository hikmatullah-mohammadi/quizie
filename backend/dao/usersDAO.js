let users
export default class usersDAO {
  static async injectDB(client) {
    try {
      users = await client.db('quizBackend').collection('users')
    } catch(err) {
      console.error(err);
    }
  }

  static async getUserData({username, password}) {
    const query = {$and: [{username: {$eq: username}}, {password: {$eq: password}}]}
    try {
      const user = await users.findOne(query)
      return user
    } catch(err) {
      console.error(err)
      return
    }
  }

  static async startQuiz({username, password, numberOfQuestions, category }) {
    let response
    const query = { $and: [{username: {$eq: username}}, {password: {$eq: password}}] }
    try {
      const { numberOfQuizes, totalNumberOfQuestions, categories } = await users.findOne(query)
      response = await users.updateOne(query, {
        $set: {
          totalNumberOfQuestions: totalNumberOfQuestions + parseInt(numberOfQuestions),
          categories: !categories.includes(category) ? [...categories, category] : categories,
          numberOfQuizes: numberOfQuizes + 1
        }
      })
    } catch(err) {
      console.error(err);
      return
    }
    return response
  }
  
  static async submitAnswers({username, password, numberOfCorrectAnswers }) {
    const query = { $and: [{username: {$eq: username}}, {password: {$eq: password}}]}
    try {
      const { totalQuestionsAnsweredCorrectly: nOfCA } = await users.findOne(query)

      const response = await users.updateOne(query, {$set: {totalQuestionsAnsweredCorrectly: nOfCA + numberOfCorrectAnswers}})
      return response
    } catch(err) {
      console.error(err)
      return
    }
  }
}


// const users = {
//   username: "ahmad_h",
//   password: "--------",
//   numberOfQuizes: 10,
//   totalNumberOfQuestions: 55,
//   totalQuestionsAnsweredCorrectly: 50,
//   categories: ['music', 'sience']
// }