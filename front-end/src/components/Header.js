import { useDispatch, useSelector } from "react-redux"
import { openHomeLoggedIn } from './../actions'
const Header = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector(state => state.quizReducer.controls.currentPage)
  return (
    <header>
      <h1 onClick={() => {
        if (currentPage === 'questions') {
          const flag = window.confirm("Do you want to exit the quiz?")
          if (!flag) return
        }
        dispatch(openHomeLoggedIn())
      }}>Quizie</h1>
      <div className="user">
        <div className="avatar" onClick={() => {
          if (currentPage === 'questions') {
            const flag = window.confirm("Do you want to exit the quiz?")
            if (!flag) return
          }
          dispatch(openHomeLoggedIn())
        }}>
          <img src="./images/avatar.png" alt=""/>
        </div>
        <span className="username">hikmatullah_m80</span>
      </div>
    </header>
  )
}

export default Header