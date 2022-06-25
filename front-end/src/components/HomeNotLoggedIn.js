import { useDispatch } from "react-redux"
import { loginAndOrFetchUserData, setIsWaiting } from "../actions"
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
          // loginWithRedirect()
          const user = {
            "nickname":"hikmatullah.m80",
            "name":"hikmatullah.m80@gmail.com",
            "picture":"https://s.gravatar.com/avatar/6f52795f7bc31f27c362809b4c71cb9e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fhi.png",
            "updated_at":"2022-06-15T19:08:41.487Z",
            "email":"hikmatullah.m80@gmail.com","email_verified":true,"sub":"auth0|62a3eb53fe7b951b13cf7c23"
          }
          dispatch(loginAndOrFetchUserData(user))
          dispatch(setIsWaiting(false))
        }}
        >Get Started</button>
    </div>
  )
}

export default HomeNotLoggedIn