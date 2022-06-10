export const isAllQuestionsAnswered = questions => {
  for(let i=0; i < questions.length; i++){
    if (!questions[i].selectedAnswer){        
      return false
    }
  }
  return true
}
