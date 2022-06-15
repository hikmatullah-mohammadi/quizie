import axios from 'axios'

export const positionCorrectAnswerIndexRandomly = answers => {
  let randonIndex // between 0-3
  while (true){
    randonIndex = Math.floor(Math.random()*10)
    if (randonIndex < 4) break
  }
  // swap the correct answer to its random position
  let tmp = answers[0]
  answers[0] = answers[randonIndex]
  answers[randonIndex] = tmp
  return answers
}


export const countTheNumberOfCorrectAnswers = (questions, answers) => {
  let numberOfCorrectAnswers = 0
  questions.map((item, index) => {
    if (item.answers.indexOf(item.correctAnswer) === answers[index]-1) numberOfCorrectAnswers++
  })
  return numberOfCorrectAnswers
}

export const getQuestions = ({numberOfQuestions, category, difficulty}) => {
  const url = `https://the-trivia-api.com/api/questions?categories=${category}&limit=${numberOfQuestions}&difficulty=${difficulty}`
  return axios(url)
}
