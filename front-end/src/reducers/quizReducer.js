import { createReducer } from '@reduxjs/toolkit'
import * as actionTypes from './../actions/types'

const initialState = {
  questions: [],

  userData: {
    username: '',
    password: '',
    avatar: '',
    numberOfQuizes: 0,
    totalNumberOfQuestions: 0,
    totalQuestionsAnsweredCorrectly: 0,
    categories: []
  },
  controls: {
    currentPage: "homeNotLoggedIn",
    isWaiting: false,
    currentNumberOfCorrectAnswers: 0
  }
}
export default createReducer(initialState, {
  [actionTypes.loggedIn+'/fulfilled']: (state, action) => {
    state.controls.currentPage = "homeLoggedIn"
    state.userData = { ...action.payload.userData }
  },
  [actionTypes.answerSelected]: (state, action) => {
    const index = state.questions.findIndex(item => item.id === action.payload.id)
    state.questions[index].selectedAnswer = action.payload.option
  },
  [actionTypes.quizSelectionPageOpened]: (state, action) => {
    state.controls.currentPage = "quizSelection"
  },
  [actionTypes.quizStarted+'/fulfilled']: (state, action) => {
    state.questions = action.payload.questions
    state.controls.currentPage = "questions"
    state.userData.totalNumberOfQuestions += action.payload.questions.length
    state.userData.numberOfQuizes += 1
    state.userData.categories.push(action.payload.category)
    // remove duplicates
    state.userData.categories = [...new Set(state.userData.categories)]
  },
  [actionTypes.answersSubmitted+"/fulfilled"]: (state, action) => {
    state.userData.totalQuestionsAnsweredCorrectly += action.payload.numberOfCorrectAnswers
    state.controls.currentNumberOfCorrectAnswers = action.payload.numberOfCorrectAnswers
  },
  [actionTypes.HomeLoggedInOpened]: (state, action) => {
    state.controls.currentPage = "homeLoggedIn"
  },
  [actionTypes.isWaitingSet]: (state, action) => {
    state.controls.isWaiting = action.payload.status
  },
  [actionTypes.loggedOut]: (state, action) => {
    state.userData = {}
    state.controls.currentPage = 'homeNotLoggedIn'
  }
})