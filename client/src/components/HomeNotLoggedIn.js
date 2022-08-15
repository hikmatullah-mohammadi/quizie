import { useDispatch } from "react-redux"
import { setIsWaiting } from "../actions"
import { useAuth0 } from '@auth0/auth0-react'

const HomeNotLoggedIn = () => {
  const dispatch = useDispatch()
  const { loginWithRedirect } = useAuth0()
  return (
    <div className="home-not-logged-in">
      <section className="welcome-msg">
        <h1>Welcome :)</h1>
        <p>Tons of multiple choice questions are available here.</p>
        <p>Assess your knowledge in your favorite subject at <span className="dollor">$0</span>.</p>
      </section>

      <section className="categories">
        <h2>You can choose the following categories</h2>
        <ul>
          <li>Arts & Literature</li>
          <li>Film & TV</li>
          <li>Food & Drink</li>
          <li>General Knowledge</li>
          <li>Geography</li>
          <li>History</li>
          <li>Music</li>
          <li>Science</li>
          <li>Society & Culture</li>
          <li>Sport & Leisure</li>
        </ul>
      </section>
      
      <section className="difficulties">
        <h2>Three difficulty levels available </h2>
        <ul>
          <li>Easy</li>
          <li>Medium</li>
          <li>Hard</li>
        </ul>
      </section>
      <button
        className="btn-get-started"
        onClick={async () => {
          dispatch(setIsWaiting(true))
          loginWithRedirect()
          dispatch(setIsWaiting(false))
        }}
        >Get Started</button>
    </div>
  )
}

export default HomeNotLoggedIn