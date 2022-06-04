import { createAction } from '@reduxjs/toolkit'
import * as actionTypes from './../actions/types'
import { getQuestions, positionCorrectAnswerIndexRandomly } from './../utils'
import data from './../data'


export const openQuizSelectionPage = createAction(actionTypes.quizSelectionPageOpened)
export const startQuiz = createAction(actionTypes.quizStarted,  quizSpecs => {
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
  return {
    payload: {
      questions: questionsWithRandomCorrectAnsIndex,
      category: quizSpecs.category
    }
  }
})
// export const startQuiz = (quizSpecs) => async dispatch => {
//   const { data } = await getQuestions(quizSpecs)

//   const questions = data.slice(0, quizSpecs.numberOfQuestions).map(q => ({
//     ...q,
//     answers: [q.correctAnswer, ...q.incorrectAnswers]
//   }))

//   // position the correct answer its (random) index
//   const questionsWithRandomCorrectAnsIndex = questions.map(q => ({
//     ...q,
//     answers: positionCorrectAnswerIndexRandomly(q.answers)
//   }))
//   dispatch({
//     type: actionTypes.quizStarted,
//     payload: {
//       questions: questionsWithRandomCorrectAnsIndex,
//       category: quizSpecs.category
//     }
//   })
// }

export const selectAnswer = createAction(actionTypes.answerSelected, (id, option) => ({
  payload: {id, option}
}))

export const openHomeLoggedIn = createAction(actionTypes.HomeLoggedInOpened)
export const submitAnswers = createAction(actionTypes.answersSubmitted)