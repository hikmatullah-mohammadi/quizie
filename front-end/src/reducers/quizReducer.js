import { createReducer } from '@reduxjs/toolkit'
import * as actionTypes from './../actions/types'

const initialState = {
  questions: [],

  userData: {
    username: '',
    avatar: '',
    numberOfQuizes: 0,
    totalNumberOfQuestions: 0,
    totalQuestionsAnsweredCorrectly: 0,
    categories: []
  },
  controls: {
    currentPage: "homeNotLoggedIn",
    isWaiting: false
  }
}
export default createReducer(initialState, {
  [actionTypes.loggedIn+'/fulfilled']: (state, action) => {
    const {username, numberOfQuizes, totalQuestionsAnsweredCorrectly, totalNumberOfQuestions, categories, avatar} = action.payload.userData
    state.controls.currentPage = "homeLoggedIn"
    state.userData = {username, numberOfQuizes, totalQuestionsAnsweredCorrectly, totalNumberOfQuestions, categories, avatar}
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
    !state.userData.categories.includes(action.payload.category) &&
      state.userData.categories.push(action.payload.category)
  },
  [actionTypes.answersSubmitted+"/fulfilled"]: (state, action) => {
    state.userData.totalQuestionsAnsweredCorrectly += action.payload.numberOfCorrectAnswers
  },
  [actionTypes.HomeLoggedInOpened]: (state, action) => {
    state.controls.currentPage = "homeLoggedIn"
  },
  [actionTypes.isWaitingSet]: (state, action) => {
    state.controls.isWaiting = action.payload.status
    console.log(action)
    console.log("action")

  }
})