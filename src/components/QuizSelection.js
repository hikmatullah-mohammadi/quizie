const QuizSelection = () => {
  return (
    <div className="quiz-selection">
      <div className="notice">
        <p><b>Please consider the following tips before you start</b></p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          repellat repudiandae saepe eligendi! Vitae illo unde, placeat rerum
          veritatis alias eum necessitatibus totam eos ullam facere facilis
          dolorem id error voluptatibus nemo
        </p>
      </div>
      <form>
        <p>
          <b>Choose your favorite quiz here</b>
        </p>
        <label>
          Select Gategory
          <select name="category" required defaultValue="">
            <option value="" disabled>
              Select gategory ---
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
          <select name="difficulty" required defaultValue="">
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
          <input type="number" placeholder="0-10" min="1" max="10" required name="numberOfQuestions"/>
        </label>
        <button type="submit" className="btn-start-quiz">
          Start
        </button>
      </form>
    </div>
  );
};

export default QuizSelection;
