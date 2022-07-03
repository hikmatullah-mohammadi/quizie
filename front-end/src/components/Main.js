import { useAuth0 } from '@auth0/auth0-react'
import Questions from './Questions'
import HomeNotLoggedIn from './HomeNotLoggedIn'
import Header from './Header'
import HomeLoggedIn from './HomeLoggedIn'
import QuizSelection from './QuizSelection'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import LoadingDisplay from './LoadingDisplay'

const Main = () => {
  const {isAuthenticated, user,isLoading, error} = useAuth0()
  
  const currentPage = useSelector(state => state.quizReducer.controls.currentPage)
  const isWaiting = useSelector(state => state.quizReducer.controls.isWaiting)
  
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
                currentPage === "questions" && <Questions />
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