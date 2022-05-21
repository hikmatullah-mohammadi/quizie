import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AlertBox from './AlertBox'
import { fetchQuestions, selectAnswer } from '../actions'
import Result from './Result'


const Questions = () => {
  const dispatch = useDispatch()
  const questions = useSelector(state => state.quizReducer.questions)
  
  const [status, setStatus] = useState({
    isSubmitting: false,
    isSubmitted: false
  })
  
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0)
  const [displayAlertBox, setDisplayAlertBox] = useState(false)
  
  useEffect(() => {
    dispatch(fetchQuestions())
  }, [])

  const handleSelectAnswer = (id, option) => {
    dispatch(selectAnswer(id, option))
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
      
      <p className="category">Python --{questions.length}q(s)--</p>
      <div>
        { elements }

        {/* displayed after submitting */}
        {
          status.isSubmitted && <Result questions={questions} numberOfCorrectAnswers={numberOfCorrectAnswers}/>
        }
        {
          !status.isSubmitted &&
          <button className='btn-submit' onClick={handleSubmit}>
            {status.isSubmitting ? "Submitting..." : "Submit"}
          </button>
        }
      </div>
    </section>
  )
}

export default Questions