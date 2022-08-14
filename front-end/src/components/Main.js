import { useAuth0 } from '@auth0/auth0-react'
import Questions from './Questions'
import HomeNotLoggedIn from './HomeNotLoggedIn'
import Header from './Header'
import HomeLoggedIn from './HomeLoggedIn'
import QuizSelection from './QuizSelection'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import LoadingDisplay from './LoadingDisplay'
import AlertBox from './AlertBox'
import { useEffect } from 'react'
import { loginAndOrFetchUserData } from '../actions'

const Main = () => {
  const { isAuthenticated, isLoading, error, user } = useAuth0()
  const dispatch = useDispatch()
  const currentPage = useSelector(state => state.quizReducer.controls.currentPage)
  const isWaiting = useSelector(state => state.quizReducer.controls.isWaiting)
  
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loginAndOrFetchUserData(user))
    }
  }, [])
  return (
    <main>
      { isWaiting && <LoadingDisplay /> }
      <Header />
      {/* <HomeLoggedIn /> */}
      {
        isLoading ? <LoadingDisplay /> : (
          !error && isAuthenticated && (
            currentPage === "homeLoggedIn" ? <HomeLoggedIn /> : (
              currentPage === "quizSelection" ? <QuizSelection /> : (
                currentPage === "questions" ? <Questions /> : 
                <AlertBox alertType="Error" alertMsg="Something went wrong. Please try again."/>
              )
            )
          )
        )
      }
      {/* if not athenticated, display homeNotLoggedIn page */}
      { (!isAuthenticated) && <HomeNotLoggedIn /> }
      <Footer />
    </main>
  )
}

export default Main