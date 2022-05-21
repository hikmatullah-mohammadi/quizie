import { useSelector } from "react-redux"

const Result = props => {
  return (
    <div className="result">
      <div>
        <p>Correct answers: {props.numberOfCorrectAnswers} out of {props.questions.length}</p>
        <progress value={props.numberOfCorrectAnswers * 100 / props.questions.length || ""} min="0" max="100" step="1"/>
        <p>{props.numberOfCorrectAnswers * 100 / props.questions.length}%</p>
      </div>
      <div>
        <button className="back-to-home">Home</button>
        <button className="take-another-quiz">Take another quiz</button>
      </div>
    </div>
  )
}
export default Result