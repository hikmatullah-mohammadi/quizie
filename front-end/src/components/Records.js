import React from 'react'
import { useSelector } from 'react-redux'

const Records = () => {
  const userData = useSelector(state => state.quizReducer.userData)
  return (
    <div className="records-progessbars">
      <h1>You have taken {userData.numberOfQuizes}&nbsp;quiz(es) in total</h1>
      <section className='correct-answers'>
        <h2>- Correct Answers</h2>
        <hr />
        {userData.totalQuestionsAnsweredCorrectly} out of {userData.totalNumberOfQuestions} questions
        <progress className='progress' value={userData.totalQuestionsAnsweredCorrectly}  min='0' max={userData.totalNumberOfQuestions}/> 
      </section>
      {/* <span>{userData.totalQuestionsAnsweredCorrectly}&nbsp;question(s)</span> out of
      <span>{userData.totalNumberOfQuestions}</span>. */}
      <section className='categories'>
        <h2>- Categories</h2>
        <hr />
        <div>
          <label>Music 25%</label>
          <progress className="progress" value='25' min="0" max="100"/>
        </div>
        <div>
          <label>Science 95%</label>
          <progress className="progress" value='95' min="0" max="100"/>
        </div>
        <div>
          <label>Culture 35%</label>
          <progress className="progress" value='35' min="0" max="100"/>
        </div>
      </section>
    </div>
  )
}

export default Records
