import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as actionTypes from './../actions/types'
import QuizDataServices from './../services/quiz'
import store from './../store'
import { encryptUserId,  encryptUserSignature } from './../utils'

export const loginAndOrFetchUserData = createAsyncThunk(actionTypes.loggedIn, async user => {
  let {picture: avatar, sub: user_id, name, email } = user
  const username = name.slice(0, 20) || name

  user_id = encryptUserId(user_id)
  const user_signature = encryptUserSignature(user_id)

  const response = await QuizDataServices.signupOrLogin({user_id, user_signature, username, email})
  console.log(response);
  if (response.status === 200){
    return { userData: {...response.data.user, user_id, avatar} }
  } else throw new Error('Something went wrong.')
})

export const openQuizSelectionPage = createAction(actionTypes.quizSelectionPageOpened)
export const startQuiz = createAsyncThunk(actionTypes.quizStarted,  async quizSpecs => {

  const { user_id } = store.getState().quizReducer.userData
  const user_signature = encryptUserSignature(user_id)
  
  const argToPass = {
    user_id,
    user_signature,
    quizSpecs
  }

  const response = await QuizDataServices.startQuiz(argToPass)
  if (response.status === 200) {
    return {
      questions: response.data.questions,
      category: quizSpecs.category
    }
  } else throw new Error('Something went wrong.')
})

export const selectAnswer = createAction(actionTypes.answerSelected, (id, option) => ({
  payload: {id, option}
}))

export const openHomeLoggedIn = createAction(actionTypes.HomeLoggedInOpened)

export const submitAnswers = createAsyncThunk(actionTypes.answersSubmitted, async ({ category, answers }) => {
  const { user_id } = store.getState().quizReducer.userData
  const user_signature = encryptUserSignature(user_id)
  const argToPass = {
    user_id,
    user_signature,
    category: category.toLowerCase(),
    answers
  }
  const response = await QuizDataServices.submitAnswers(argToPass)
  if (response.status === 200) {
    return { numberOfCorrectAnswers: response.data.numberOfCorrectAnswers, category: category.toLowerCase() }
  } else throw new Error('Something went wrong.')
})

export const setIsWaiting = createAction(actionTypes.isWaitingSet, status => ({
  payload: {status}
}))