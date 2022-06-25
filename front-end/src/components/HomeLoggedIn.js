import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAndOrFetchUserData, logoutAction, openQuizSelectionPage, setIsWaiting } from "../actions";
import Records from "./Records";


const HomeLoggedIn = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.quizReducer.userData)
  const {user, logout} = useAuth0()
  
  // useEffect(() => {
  //   dispatch(setIsWaiting(true))
  //   dispatch(loginAndOrFetchUserData(user))
  //   dispatch(setIsWaiting(false))
  // }, [dispatch, user])

  return (
    <div className="home-logged-in">
      <h1>WELCOME!</h1>
      <div className="records">
        {
          userData.numberOfQuizes > 0 ?
            <Records /> : 
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
        onClick={async () => {
          // await logout()
          dispatch(logoutAction())
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default HomeLoggedIn
