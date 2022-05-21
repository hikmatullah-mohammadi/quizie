import { useDispatch } from "react-redux"
import { openHomeLoggedIn } from './../actions'
const Header = () => {
  const dispatch = useDispatch()
  return (
    <header>
      <h1 onClick={() => dispatch(openHomeLoggedIn())}>Quizie</h1>
      <div className="user">
        <div className="avatar" onClick={() => dispatch(openHomeLoggedIn())}>
          <img src="./images/avatar.png" alt=""/>
        </div>
        <span className="username">hikmatullah_m80</span>
      </div>
    </header>
  )
}
  
export default Header