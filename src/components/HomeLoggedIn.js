const HomeLoggedIn = () => {
  return (
    <div className="home-logged-in">
      <h3>WELCOME!</h3>
      <div className="records">
        <p>
          You have taken <span>10&nbsp;quiz(es)</span> in different categories
          including <em>sience, film and movies</em>. And you have correctly
          answered <span>50&nbsp;question(s)</span> out of <span>55</span>. 
        </p>
        <div className="rating">
          <i className="fa fa-star"></i><br />
          <span>4.50</span>
        </div>
      </div>
      <button className="btn-take-quiz">Take a quiz</button>
    </div>
  )
}

export default HomeLoggedIn