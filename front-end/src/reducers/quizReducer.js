import { createReducer } from '@reduxjs/toolkit'
import * as actionTypes from './../actions/types'

const initialState = {
  questions: [],

  userData: {
    user_id: '',
    username: '',
    avatar: '',
    numberOfQuizes: 0,
    totalNumberOfQuestions: 0,
    totalQuestionsAnsweredCorrectly: 0,
    categories: []
  },
  controls: {
    currentPage: "homeLoggedIn",
    isWaiting: false,
    currentNumberOfCorrectAnswers: 0,
    currentCategory: ''
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
    state.userData.totalNumberOfQuestions += action.payload.questions.length
    state.userData.numberOfQuizes += 1

    const index = state.userData.categories.findIndex(item => item.title === action.payload.category)
    if (index > -1 ){
      state.userData.categories[index].questions += action.payload.questions.length
    } else {
      state.userData.categories.push({
        title: action.payload.category,
        questions: action.payload.questions.length,
        correctAnswers: 0
      })
    }
    state.controls.currentCategory = action.payload.category
    state.controls.currentPage = "questions"
    
  },
  [actionTypes.answersSubmitted+"/fulfilled"]: (state, action) => {
    const {numberOfCorrectAnswers, category} = action.payload
    state.userData.totalQuestionsAnsweredCorrectly += numberOfCorrectAnswers
    const index = state.userData.categories.findIndex(item => item.title === category)
    state.userData.categories[index].correctAnswers += numberOfCorrectAnswers
    state.controls.currentNumberOfCorrectAnswers = numberOfCorrectAnswers
  },
  [actionTypes.HomeLoggedInOpened]: (state, action) => {
    state.controls.currentPage = "homeLoggedIn"
  },
  [actionTypes.isWaitingSet]: (state, action) => {
    state.controls.isWaiting = action.payload.status
  },
  [actionTypes.loggedOut]: (state, action) => {
    state.userData = {}
  }
})