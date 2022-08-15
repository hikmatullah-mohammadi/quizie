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
      <section className="notice">
        <h2>Please consider the followings before you start</h2>
        <div>
          <ul>
            <li>There is no time limitations.</li>
            <li>Once you start, it will effect your rating wether of not you submit the answers; so please
            make sure NOT to quit the quiz before you submit it.</li>
            <li>You can take as many quizes as you desire.</li>
          </ul>
          <p className='text-center happy-assessment'>Happy Assessment :)</p>
        </div>
      </section>
      <section>
        <h2>Choose your favorite quiz here </h2>
        <form onSubmit={handleSubmit}>
          <label>
            Select Gategory
            <select name="category" required value={state.category} onChange={handleSelect}>
              <option value="" disabled>
                Select category ---
              </option>
              <option value="arts_and_literature">Arts & Literature</option>
              <option value="film_and_tv">Film & TV</option>
              <option value="food_and_drink">Food & Drink</option>
              <option value="general_knowledge">General Knowledge</option>
              <option value="geography">Geography</option>
              <option value="history">History</option>
              <option value="music">Music</option>
              <option value="science">Science</option>
              <option value="society_and_culture">Society & Culture</option>
              <option value="sport_and_leisure">Sport & Leisure</option>
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
      </section>
    </div>
  );
};

export default QuizSelection;
