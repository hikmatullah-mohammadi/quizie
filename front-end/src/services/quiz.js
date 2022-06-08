import http from './../http-common.js'

class QuizDataServices {
  static getUserData(data) {
    return http.post('/user', data)
  }
  static startQuiz(data) {
    return http.post('/start-quiz', data)
  }
  static submitAnswers(data) {
    return http.post('/submit-answers', data)
  }
}

export default QuizDataServices