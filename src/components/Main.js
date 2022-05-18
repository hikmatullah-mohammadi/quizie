import Questions from './Questions'
import HomeNotLoggedIn from './HomeNotLoggedIn'
import Header from './Header'
import HomeLoggedIn from './HomeLoggedIn'

const Main = () => {
  return (
    <main>
      <Header />
      {/* <Questions /> */}
      {/* <HomeNotLoggedIn /> */}
      <HomeLoggedIn />
    </main>
  )
}

export default Main