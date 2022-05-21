import { useDispatch } from "react-redux"
import { openHomeLoggedIn, openQuizSelectionPage } from "./../actions"

const Result = props => {
  const dispatch = useDispatch()
  return (
    <div className="result">
      <div>
        <p>Correct answers: {props.numberOfCorrectAnswers} out of {props.questions.length}</p>
        <progress value={props.numberOfCorrectAnswers * 100 / props.questions.length || ""} min="0" max="100" step="1"/>
        <p>{(props.numberOfCorrectAnswers * 100 / props.questions.length).toFixed(2)}%</p>
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