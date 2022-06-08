import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as actionTypes from './../actions/types'
import { getQuestions, positionCorrectAnswerIndexRandomly } from './../utils'
import QuizDataServices from './../services/quiz'
import data from './../data'

export const login = createAsyncThunk(actionTypes.loggedIn, async () => {
  const userData = await QuizDataServices.getUserData({username: 'hikmatullah_m80', password: '1234'})
  return {
    userData: userData.data
  }
})

export const openQuizSelectionPage = createAction(actionTypes.quizSelectionPageOpened)
export const startQuiz = createAsyncThunk(actionTypes.quizStarted,  async quizSpecs => {
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

  const dataArg = {
    username: 'hikmatullah_m80',
    password: '1234',
    numberOfQuestions: quizSpecs.numberOfQuestions,
    category: quizSpecs.category
  }
  await QuizDataServices.startQuiz(dataArg)
  return {
    questions: questionsWithRandomCorrectAnsIndex,
    category: quizSpecs.category
  }
})

export const selectAnswer = createAction(actionTypes.answerSelected, (id, option) => ({
  payload: {id, option}
}))

export const openHomeLoggedIn = createAction(actionTypes.HomeLoggedInOpened)
export const submitAnswers = createAsyncThunk(actionTypes.answersSubmitted, async ({numberOfCorrectAnswers}) => {
  const dataArg = {
    username: 'hikmatullah_m80',
    password: '1234',
    numberOfCorrectAnswers
  }
  const response = await QuizDataServices.submitAnswers(dataArg)
  return { numberOfCorrectAnswers }
})

export const setIsWaiting = createAction(actionTypes.isWaitingSet, status => ({
  payload: {status}
}))