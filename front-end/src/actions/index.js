import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as actionTypes from './../actions/types'
import QuizDataServices from './../services/quiz'
import store from './../store'
import { encryptUserId,  encryptUserSignature } from './../utils'

export const loginAndOrFetchUserData = createAsyncThunk(actionTypes.loggedIn, async user => {
  let {picture: avatar, email, sub: user_id } = user
  const username = email.slice(0, 20) || email

  user_id = encryptUserId(user_id)
  const user_signature = encryptUserSignature(user_id)

  const userData = await QuizDataServices.signupOrLogin({user_id, user_signature, username})
  if (userData){
    return { userData: {...userData.data, user_id, avatar} }
  }
})

export const logoutAction = createAction(actionTypes.loggedOut)

export const openQuizSelectionPage = createAction(actionTypes.quizSelectionPageOpened)
export const startQuiz = createAsyncThunk(actionTypes.quizStarted,  async quizSpecs => {

  const { user_id } = store.getState().quizReducer.userData
  const user_signature = encryptUserSignature(user_id)
  
  const argToPass = {
    user_id,
    user_signature,
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
  const { user_id } = store.getState().quizReducer.userData
  const user_signature = encryptUserSignature(user_id)
  const argToPass = {
    user_id,
    user_signature,
    answers
  }
  const { data } = await QuizDataServices.submitAnswers(argToPass)
  return { numberOfCorrectAnswers: data.numberOfCorrectAnswers }
})

export const setIsWaiting = createAction(actionTypes.isWaitingSet, status => ({
  payload: {status}
}))