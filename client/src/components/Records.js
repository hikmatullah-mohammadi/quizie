import React from 'react'
import { useSelector } from 'react-redux'
import { formatCategories } from './../utils'

const Records = () => {
  const userData = useSelector(state => state.quizReducer.userData)
  
  const categoriesElements = userData.categories.map((item, index) => (
    <div key={index}>
      <label>{formatCategories(item.title)} {(item.correctAnswers ? (item.correctAnswers * 100 / item.questions) : 0).toFixed(2)}%</label>
      <progress className="progress" value={item.correctAnswers ? item.correctAnswers : 0} min="0" max={item.questions}/>
    </div>
  ))
  return (
    <div className="records-progessbars">
      <h2>You have taken {userData.numberOfQuizes}&nbsp;quiz(es) in total</h2>
      <section className='correct-answers'>
        <h3>- Correct Answers</h3>
        <hr />
        {userData.totalQuestionsAnsweredCorrectly} out of {userData.totalNumberOfQuestions} questions
        <progress className='progress' value={userData.totalQuestionsAnsweredCorrectly}  min='0' max={userData.totalNumberOfQuestions}/> 
      </section>
  
      <section className='categories'>
        <h3>- Categories</h3>
        <hr />
        <div>
          { categoriesElements }
        </div>
      </section>
    </div>
  )
}

export default Records
