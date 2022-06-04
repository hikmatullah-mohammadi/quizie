import { createReducer } from '@reduxjs/toolkit'
import * as actionTypes from './../actions/types'

const initialState = {
  questions: [],
  userData: {
    numberOfQuizes: 10,
    totalNumberOfQuestions: 55,
    totalQuestionsAnsweredCorrectly: 50,
    categories: ['music', 'sience']
  },
  controls: {
    currentPage: "homeLoggedIn"
  }
}
export default createReducer(initialState, {
  [actionTypes.answerSelected]: (state, action) => {
    const index = state.questions.findIndex(item => item.id === action.payload.id)
    state.questions[index].selectedAnswer = action.payload.option
  },
  [actionTypes.quizSelectionPageOpened]: (state, action) => {
    state.controls.currentPage = "quizSelection"
  },
  [actionTypes.quizStarted]: (state, action) => {
    state.questions = action.payload.questions
    state.controls.currentPage = "questions"
    state.userData.totalNumberOfQuestions += action.payload.questions.length
    state.userData.numberOfQuizes += 1
    !state.userData.categories.includes(action.payload.category) &&
      state.userData.categories.push(action.payload.category)
  },
  [actionTypes.answersSubmitted]: (state, action) => {
    state.userData.totalQuestionsAnsweredCorrectly += action.payload.numberOfCorrectAnswers
  },
  [actionTypes.HomeLoggedInOpened]: (state, action) => {
    state.controls.currentPage = "homeLoggedIn"
  },
})