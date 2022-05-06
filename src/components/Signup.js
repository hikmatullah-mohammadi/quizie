const Signup = () => {
  return (
    <div className="signup-page">
      <h1><i className='fa fa-home'></i> Quizie</h1>
      <form>
        <label><i className='fa fa-user'></i> Email address</label><br />
        <input type='text' placeholder="Enter email"/><br />
        <label><i className='fa fa-lock'></i> Password</label><br />
        <input type='password' placeholder="Enter password"/><br />
        <label><i className='fa fa-lock'></i> Confirm password</label><br />
        <input type='password' placeholder="Re-enter password"/><br />
        <input type='submit' value='Register'/>
      </form>
      <p className="have-an-acount">Already have an acount? <a href="#!">Login</a></p>
      <div className="alternative-signup">
        <p>Or sign up with</p>
        <button><i className="fab fa-google-plus"></i> Google</button>
        <button><i className="fab fa-facebook"></i> Facebook</button>
      </div>
    </div>
  )
}

export default Signup