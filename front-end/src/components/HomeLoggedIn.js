import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAndOrFetchUserData, logoutAction, openQuizSelectionPage, setIsWaiting } from "../actions";
import Records from "./Records";
import AlertBox from './AlertBox'

const HomeLoggedIn = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.quizReducer.userData)
  const {user, logout, isAuthenticated} = useAuth0()
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setIsWaiting(true))
      await dispatch(loginAndOrFetchUserData(user))
      dispatch(setIsWaiting(false))
    }
    fetchData()
  }, [dispatch, user])

  if (!user.email_verified){
    return <AlertBox alertType="Warning" alertMsg="Please verify your email and refresh the page. We sent you a verification email when you signed up."/>
  }  
  return (
    <div className="home-logged-in">
      <h1>WELCOME!</h1>
      <div className="records">
        {
          userData.numberOfQuizes > 0 ?
            <Records /> : 
          <div className='noquizpassed'><h4>Oops! You haven't passed any quizes yet.</h4></div>
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
          dispatch(setIsWaiting(true))
          logout()
          dispatch(setIsWaiting(false))
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default HomeLoggedIn
