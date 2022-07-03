import { useDispatch, useSelector } from "react-redux"
import { useAuth0 } from '@auth0/auth0-react'
import { openHomeLoggedIn } from './../actions'

const Header = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector(state => state.quizReducer.controls.currentPage)
  const {username, avatar} = useSelector(state => state.quizReducer.userData)
  const { isAuthenticated } = useAuth0()

  return (
    <header style={{justifyContent: isAuthenticated ? "space-between" : "space-around"}} >
      <h1
        onClick={() => {
          if ( !isAuthenticated ) return
          if (currentPage === 'questions') {
            const flag = window.confirm("Do you want to go back to the home page?")
            if (!flag) return
          }
          dispatch(openHomeLoggedIn())
        }}
      >Quizie</h1>
      {
        isAuthenticated && 
          <div className="user">
            <div className="avatar" onClick={() => {
              if (currentPage === 'questions') {
                const flag = window.confirm("Do you want to go back to the home page?")
                if (!flag) return
              }
              dispatch(openHomeLoggedIn())
            }}>
              <img src={avatar ? avatar : './images/avatars/default-avatar.svg'} alt="avatar"/>
            </div>
            <span className="username">{username}</span>
          </div>
      }
    </header>
  )
}

export default Header