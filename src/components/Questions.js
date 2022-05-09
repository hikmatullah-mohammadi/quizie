import { useEffect, useReducer, useState } from 'react'
import data from './../data'

const questionsReducer = (state, action) => {
  switch(action.type) {
    case 'qusetionsFetched':
      return action.payload.data
    case 'answerSelected':
      return state.map(item => item.id === action.payload.id ? {...item, selectedAnswer: action.payload.option} : item)
    default:
      return state
  }
}

const positionCorrectAnswerIndexRandomly = (answers) => {
  let randonIndex // between 0-3
  while (true){
    randonIndex = Math.floor(Math.random()*10)
    if (randonIndex < 4) break
  }
  // swap the correct answer to its random position
  let tmp = answers[0]
  answers[0] = answers[randonIndex]
  answers[randonIndex] = tmp
  return answers
}

const Questions = () => {
  const [questions, answerDispatch] = useReducer(questionsReducer, [])

  useEffect(() => {
    // put correct answer and incorrect answers together in an array
    const questions = data.map(q => ({
      ...q,
      answers: [q.correctAnswer, ...q.incorrectAnswers]
    }))

    // position the correct answer its (random) index
    const questionsWithRandomCorrectAnsIndex = questions.map(q => ({
      ...q,
      answers: positionCorrectAnswerIndexRandomly(q.answers)
    }))
    answerDispatch({
      type: 'qusetionsFetched',
      payload: {
        data: questionsWithRandomCorrectAnsIndex
      }
    })
  }, [])

  const handleSelectAnswer = (id, option) => {
    answerDispatch({
      type: 'answerSelected',
      payload: {id, option}
    })
  }
  
  const elements = questions.map((item, index) => (
    <div className='question' key={item.id}>
      <p>
        <span className="q-number">{index + 1}</span>
        {item.question}
      </p>
      <ul className="answers">
        <li onClick={() => handleSelectAnswer(item.id, '1')} >
          <span className={item.selectedAnswer === '1' ? 'selected-answer' : ''}>1</span>
          {" "}{item.answers[0]}
          </li>
        <li onClick={() => handleSelectAnswer(item.id, '2')}>
          <span className={item.selectedAnswer === '2' ? 'selected-answer' : ''}>2</span>
          {" "}{item.answers[1]}
        </li>
        <li onClick={() => handleSelectAnswer(item.id, '3')}>
          <span className={item.selectedAnswer === '3' ? 'selected-answer' : ''}>3</span>
          {" "}{item.answers[2]}
        </li>
        <li onClick={() => handleSelectAnswer(item.id, '4')}>
          <span className={item.selectedAnswer === '4' ? 'selected-answer' : ''}>4</span>
          {" "}{item.answers[3]}
        </li>
      </ul>
    </div>
  ))
  return (
    <section className='questions'>
      <h2>Python (20q)</h2>
      <div>
        { elements }
        <button className='btn-submit'>Submit</button>
      </div>
    </section>
  )
}

export default Questions