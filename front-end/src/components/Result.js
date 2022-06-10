import { useDispatch, useSelector } from "react-redux"
import { openHomeLoggedIn, openQuizSelectionPage } from "./../actions"

const Result = props => {
  const dispatch = useDispatch()
  const currentNumberOfCorrectAnswers = useSelector(state => state.quizReducer.controls.currentNumberOfCorrectAnswers)
  console.log(currentNumberOfCorrectAnswers)
  return (
    <div className="result">
      <div>
        <p>Correct answers: {currentNumberOfCorrectAnswers} out of {props.numberOfQuestions}</p>
        <progress value={currentNumberOfCorrectAnswers * 100 / props.numberOfQuestions || ""} min="0" max="100" step="1"/>
        <p>{(currentNumberOfCorrectAnswers * 100 / props.numberOfQuestions).toFixed(2)}%</p>
      </div>
      <div>
        <button 
          className="back-to-home"
          onClick={() => dispatch(openHomeLoggedIn())}
        >Home</button>
        <button
          className="take-another-quiz"
          onClick={() => dispatch(openQuizSelectionPage())}
        >Take another quiz</button>
      </div>
    </div>
  )
}
export default Result