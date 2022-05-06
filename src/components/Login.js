const Login = () => {
  return (
    <div className="login-page">
      <form>
        <label>Username/email</label><br />
        <input type='text'/><br />
        <label>Password</label><br />
        <input type='password'/><br />
        <input type='submit' value='Login'/>
      </form>
      <p><a href="#!">I forgot my password.</a></p>
      <p>New here? <a href="#!">Sign up</a></p>
    </div>
  )
}

export default Login