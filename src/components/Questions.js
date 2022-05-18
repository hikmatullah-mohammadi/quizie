import { useEffect, useReducer, useState } from 'react'
import data from './../data'
import AlertBox from './AlertBox'

const questionsReducer = (state, action) => {
  switch(action.type) {
    case 'qusetionsFetched':
      return action.payload.data
    case 'answerSelected':
      return state.map(item => item.id === action.payload.id ?
        {...item, selectedAnswer: action.payload.option} : item)
    default:
      return state
  }
}

const Questions = () => {
  const [questions, answerDispatch] = useReducer(questionsReducer, [])
  const [status, setStatus] = useState({
    isSubmitting: false,
    isSubmitted: false
  })
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0)
  const [displayAlertBox, setDisplayAlertBox] = useState(false)

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
  
  const handleSubmit = () => {
    let isAllQuestionsAnswered = true
    questions.forEach(item => {
      if (!item.selectedAnswer){        
        isAllQuestionsAnswered = false
        setDisplayAlertBox(true)
        setTimeout(() => {
          setDisplayAlertBox(false)
        }, 2000);
        return
      }
    })
    if (!isAllQuestionsAnswered) {
      return
    }
    setStatus({...status, isSubmitting: true})
    let nCorrectAnswers = 0
    questions.forEach(q => {
      if (q.answers.indexOf(q.correctAnswer) === q.selectedAnswer-1) {
        nCorrectAnswers++
      }
    });
    
    setNumberOfCorrectAnswers(nCorrectAnswers)
    setStatus({isSubmitting: false, isSubmitted: true})
  }
  const elements = questions.map((item, index) => (
    <div className='question' key={item.id}>
      <p>
        <span className="q-number">{index + 1}</span>
        {item.question}
      </p>
      <ul className="answers">
        <li 
          onClick={() => handleSelectAnswer(item.id, '1')}
          className={
            !status.isSubmitted ? "" : (
              item.answers.indexOf(item.correctAnswer) === 0 ? "correct-answer" : (
                item.selectedAnswer-1 === 0 ? "wrong-answer" : ""
              )
            )
          }
        >
          <span className={item.selectedAnswer === '1' ? 'selected-answer' : ''}>1</span>
          {" "}{item.answers[0]}
          </li>
        <li
          onClick={() => handleSelectAnswer(item.id, '2')}
          className={
            !status.isSubmitted ? "" : (
              item.answers.indexOf(item.correctAnswer) === 1 ? "correct-answer" : (
                item.selectedAnswer-1 === 1 ? "wrong-answer" : ""
              )
            )
          }
        >
          <span className={item.selectedAnswer === '2' ? 'selected-answer' : ''}>2</span>
          {" "}{item.answers[1]}
        </li>
        <li
          onClick={() => handleSelectAnswer(item.id, '3')}
          className={
            !status.isSubmitted ? "" : (
              item.answers.indexOf(item.correctAnswer) === 2 ? "correct-answer" : (
                item.selectedAnswer-1 === 2 ? "wrong-answer" : ""
              )
            )
          }
        >
          <span className={item.selectedAnswer === '3' ? 'selected-answer' : ''}>3</span>
          {" "}{item.answers[2]}
        </li>
        <li
          onClick={() => handleSelectAnswer(item.id, '4')}
          className={
            !status.isSubmitted ? "" : (
              item.answers.indexOf(item.correctAnswer) === 3 ? "correct-answer" : (
                item.selectedAnswer-1 === 3 ? "wrong-answer" : ""
              )
            )
          }
        >
          <span className={item.selectedAnswer === '4' ? 'selected-answer' : ''}>4</span>
          {" "}{item.answers[3]}
        </li>
      </ul>
    </div>
  ))
  return (
    <section className='questions'>
      {/* display when not all questions are answered */}
      { displayAlertBox &&
        <AlertBox 
        alertType="Error"
        alertMsg="Please answer all the questions..."
      />
      }
      
      <h2>Python (20q)</h2>
      <div>
        { elements }
        <div className="result" style={{display: status.isSubmitted ? "block" : "none"}}>
          <p>Correct answers: {numberOfCorrectAnswers} out of {questions.length}</p>
          <progress value={numberOfCorrectAnswers * 100 / questions.length} min="0" max="100" step="1"/>
          <p>{numberOfCorrectAnswers * 100 / questions.length}%</p>
        </div>
        <button className='btn-submit' onClick={handleSubmit}>
          {status.isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </section>
  )
}


function positionCorrectAnswerIndexRandomly (answers) {
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

export default Questions