import { createAction } from '@reduxjs/toolkit'
import * as actionTypes from './../actions/types'
import { positionCorrectAnswerIndexRandomly } from './../utils'
import data from './../data'

export const fetchQuestions = createAction(actionTypes.questionsFetched, () => {
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
  return {
    type: actionTypes.questionsFetched,
    payload: {
      data: questionsWithRandomCorrectAnsIndex
    }
  }
})

export const selectAnswer = createAction(actionTypes.answerSelected, (id, option) => ({
  payload: {id, option}
}))