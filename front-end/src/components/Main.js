import Questions from './Questions'
import HomeNotLoggedIn from './HomeNotLoggedIn'
import Header from './Header'
import HomeLoggedIn from './HomeLoggedIn'
import QuizSelection from './QuizSelection'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import LoadingDisplay from './LoadingDisplay'

const Main = () => {
  const currentPage = useSelector(state => state.quizReducer.controls.currentPage)
  const isWaiting = useSelector(state => state.quizReducer.controls.isWaiting)
  return (
    <main>
      { isWaiting && <LoadingDisplay />}
      <Header />
      { currentPage === "homeNotLoggedIn" && <HomeNotLoggedIn /> }
      { currentPage === "homeLoggedIn" && <HomeLoggedIn /> }
      { currentPage === "quizSelection" && <QuizSelection /> }
      { currentPage === "questions" && <Questions /> }
      <Footer />
    </main>
  )
}

export default Main