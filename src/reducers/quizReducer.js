import { createReducer } from '@reduxjs/toolkit'
import * as actionTypes from './../actions/types'

const initialState = {
  questions: [],
  userData: {},
  controls: {

  }
}
export default createReducer(initialState, {
  [actionTypes.questionsFetched]: (state, action) => {
    state.questions = action.payload.data
  },
  [actionTypes.answerSelected]: (state, action) => {
    const index = state.questions.findIndex(item => item.id === action.payload.id)
    state.questions[index].selectedAnswer = action.payload.option
  }
})




