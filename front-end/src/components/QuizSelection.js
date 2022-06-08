import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsWaiting, startQuiz } from "../actions";

const QuizSelection = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    numberOfQuestions: '',
    difficulty: '',
    category: ''
  })

  const handleSelect = e => {
    const {name, value} = e.target
    setState(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(setIsWaiting(true))
    await dispatch(startQuiz(state))
    dispatch(setIsWaiting(false))
    setState({
      numberOfQuestions: '',
      difficulty: '',
      category: ''
    })
  }
  return (
    <div className="quiz-selection">
      <div className="notice">
        <p><b>Please consider the following tips before you start</b></p>
        <p>
          <b style={{color: 'red'}} >-*</b> You have 1 minute for every question. (10 minutes for 10 questions in total)<br />
          <b style={{color: 'red'}}>-*</b> Once you start, it will effect your rating wether of not you submit your answer; so please
          make sure NOT to quit before you submit the answer. <br />
          <b style={{color: 'red'}}>-*</b> You can take as many quizes as you desire.<br />
          <span style={{display: 'block', textAlign: "center", marginTop:"20px"}}><b>Happy Assessment :)</b></span>
        </p>
      </div>
      <form onSubmit={handleSubmit} method="">
        <p>
          <b>Choose your favorite quiz here</b>
        </p>
        <label>
          Select Gategory
          <select name="category" required value={state.category} onChange={handleSelect}>
            <option value="" disabled>
              Select category ---
            </option>
            <option value="artsAndLiterature">Arts & Literature</option>
            <option value="filmAndTV">Film & TV</option>
            <option value="foodAndDrink">Food & Drink</option>
            <option value="generalKnowledge">General Knowledge</option>
            <option value="geography">Geography</option>
            <option value="history">History</option>
            <option value="music">Music</option>
            <option value="science">Science</option>
            <option value="societyAndCulture">Society & Culture</option>
            <option value="sportAndLeisure">Sport & Leisure</option>
          </select>
        </label>
        <label>
          Select Difficulty
          <select name="difficulty" required value={state.difficulty} onChange={handleSelect}>
            <option value="" disabled>
              Select difficulty ---
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
          Number of Questions
          <select value={state.numberOfQuestions} required name="numberOfQuestions" onChange={handleSelect}>
            <option value="" disabled>
              Select number of questions --
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>
        <button type="submit" className="btn-start-quiz" >
          Start
        </button>
      </form>
    </div>
  );
};

export default QuizSelection;
