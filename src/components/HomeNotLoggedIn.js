const HomeNotLoggedIn = () => {
  return (
    <div className="home-not-logged-in">
      <div className="welcome-msg">
        <p>Tons of multiple choice questions are available here.</p>
        <p>Assess your knowledge in your favorite subject at $0.</p>
      </div>
      <div>
        <div className="categories">
          <h3>You can choose the following categories</h3>
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
        </div>
        <hr />
        <div className="difficulties">
          <h3>Three difficulty levels available </h3>
          <ul>
            <li>Easy</li>
            <li>Medium</li>
            <li>Hard</li>
          </ul>
        </div>
      </div>
      <button className="btn-get-started">Get Started</button>
    </div>
  )
}

export default HomeNotLoggedIn