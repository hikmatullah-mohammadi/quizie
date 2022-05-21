export const positionCorrectAnswerIndexRandomly = answers => {
  let randonIndex // between 0-3
  while (true){
    randonIndex = Math.floor(Math.random()*10)
    if (randonIndex < 4) break
  }
  // swap the correct answer to its random position
  let tmp = answers[0]
  answers[0] = answers[randonIndex]
  answers[randonIndex] = tmp
  return answers
}