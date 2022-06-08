import { useDispatch, useSelector } from "react-redux"
import { openHomeLoggedIn } from './../actions'

const Header = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector(state => state.quizReducer.controls.currentPage)
  const {username, avatar} = useSelector(state => state.quizReducer.userData)
  
  return (
    <header style={{justifyContent: currentPage !== 'homeNotLoggedIn' ? "space-between" : "space-around"}} >
      <h1
        onClick={() => {
          if (currentPage === 'questions') {
            const flag = window.confirm("Do you want to exit the quiz?")
            if (!flag) return
          }
          dispatch(openHomeLoggedIn())
        }}
      >Quizie</h1>
      {
        currentPage !== 'homeNotLoggedIn' && 
          <div className="user">
            <div className="avatar" onClick={() => {
              if (currentPage === 'questions') {
                const flag = window.confirm("Do you want to exit the quiz?")
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