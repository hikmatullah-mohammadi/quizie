import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as actionTypes from './../actions/types'
import QuizDataServices from './../services/quiz'
import store from './../store'

export const login = createAsyncThunk(actionTypes.loggedIn, async () => {
  const userData = await QuizDataServices.getUserData({username: 'hikmatullah_m80', password: '1234'})
  return {
    userData: userData.data
  }
})
export const logout = createAction(actionTypes.loggedOut)

export const openQuizSelectionPage = createAction(actionTypes.quizSelectionPageOpened)
export const startQuiz = createAsyncThunk(actionTypes.quizStarted,  async quizSpecs => {

  const {username, password} = store.getState().quizReducer.userData
  
  const argToPass = {
    username,
    password,
    quizSpecs
  }

  const { data } = await QuizDataServices.startQuiz(argToPass)
  return {
    questions: data,
    category: quizSpecs.category
  }
})

export const selectAnswer = createAction(actionTypes.answerSelected, (id, option) => ({
  payload: {id, option}
}))

export const openHomeLoggedIn = createAction(actionTypes.HomeLoggedInOpened)
export const submitAnswers = createAsyncThunk(actionTypes.answersSubmitted, async answers => {
  const {username, password} = store.getState().quizReducer.userData
  
  const argToPass = {
    username,
    password,
    answers
  }
  const { data } = await QuizDataServices.submitAnswers(argToPass)
  return { numberOfCorrectAnswers: data.numberOfCorrectAnswers }
})

export const setIsWaiting = createAction(actionTypes.isWaitingSet, status => ({
  payload: {status}
}))