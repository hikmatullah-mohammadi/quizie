import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as actionTypes from './../actions/types'
import QuizDataServices from './../services/quiz'
import store from './../store'
import { encryptUserId,  encryptUserSignature } from './../utils'

export const login = createAsyncThunk(actionTypes.loggedIn, async user => {
  let {picture: avatar, email, sub: user_id } = user
  const username = email.slice(0, 20) || email

  user_id = encryptUserId(user_id)
  const user_signature = encryptUserSignature(user_id)

  const userData = await QuizDataServices.signupOrLogin({user_id, user_signature, username})
  if (userData){
    return { userData: {...userData.data, avatar} }
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