import Questions from './Questions'
import HomeNotLoggedIn from './HomeNotLoggedIn'
import Header from './Header'
import HomeLoggedIn from './HomeLoggedIn'
import QuizSelection from './QuizSelection'
import Footer from './Footer'

const Main = () => {
  return (
    <main>
      <Header />
      <HomeNotLoggedIn />
      {/* <HomeLoggedIn /> */}
      {/* <QuizSelection /> */}
      {/* <Questions /> */}
      <Footer />
    </main>
  )
}

export default Main