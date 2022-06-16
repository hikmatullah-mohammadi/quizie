import axios from 'axios'
import cryptoJs from 'crypto-js'

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


export const decryptUserSignature = user_signature => {
  const origText = cryptoJs.AES.decrypt(user_signature, 'k')
  return origText.toString(cryptoJs.enc.Utf8)
}
export const decryptUserId = user_id => {
  const origText = cryptoJs.AES.decrypt(user_id, 'k')
  return origText.toString(cryptoJs.enc.Utf8)
}


/*
{"nickname":"hikmatullah.m80",
"name":"hikmatullah.m80@gmail.com",
"picture":"https://s.gravatar.com/avatar/6f52795f7bc31f27c362809b4c71cb9e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fhi.png",
"updated_at":"2022-06-15T19:08:41.487Z",
"email":"hikmatullah.m80@gmail.com","email_verified":true,"sub":"auth0|62a3eb53fe7b951b13cf7c23"}
*/