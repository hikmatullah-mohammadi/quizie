import { useDispatch, useSelector } from "react-redux";
import { logout, openQuizSelectionPage, setIsWaiting } from "../actions";

const HomeLoggedIn = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.quizReducer.userData)
  return (
    <div className="home-logged-in">
      <h3>WELCOME!</h3>
      <div className="records">
        {
          userData.numberOfQuizes > 0 ?
          <p>
            You have taken <span>{userData.numberOfQuizes}&nbsp;quiz(es)</span> in different categories
            including <em><b>{userData.categories.join(', ')}</b></em>. And you have correctly
            answered <span>{userData.totalQuestionsAnsweredCorrectly}&nbsp;question(s)</span> out of
            <span>{userData.totalNumberOfQuestions}</span>.
          </p> : 
          <p>You haven't passed any quizes yet <span>:)</span></p>
        }
        <div className="rating">
          <i className="fa fa-star"></i>
          <br />
          <span>
            {
              (userData.totalQuestionsAnsweredCorrectly * 5 / userData.totalNumberOfQuestions || 0).toFixed(2)
            }
          </span>
        </div>
      </div>
      <button
        className="btn-take-quiz"
        onClick={async () => {
          dispatch(setIsWaiting(true))
          await dispatch(openQuizSelectionPage())
          dispatch(setIsWaiting(false))
        }}
      >
        Take a quiz
      </button>
      <button
        className="btn-logout"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </div>
  );
};

export default HomeLoggedIn;
