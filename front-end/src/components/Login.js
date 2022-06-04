const Login = () => {
  return (
    <div className="login-page">
      <h1><i className='fa fa-home'></i> Quizie</h1>
      <form>
        <label><i className='fa fa-user'></i> Username/email</label><br />
        <input type='text' placeholder="Enter email or username"/><br />
        <label><i className='fa fa-lock'></i> Password</label><br />
        <input type='password' placeholder="Enter password"/><br />
        <input type='submit' value='Login'/>
      </form>
      <p className="forgot-psw"><a href="#!">I forgot my password.</a></p>
      <p className="new-here">New here? <a href="#!">Sign up</a></p>
    </div>
  )
}

export default Login