import cryptoJs from 'crypto-js'

export const isAllQuestionsAnswered = questions => {
  for(let i=0; i < questions.length; i++){
    if (!questions[i].selectedAnswer){        
      return false
    }
  }
  return true
}

export const encryptUserId = userId => {
  const cipherText = cryptoJs.AES.encrypt(userId, 'k')
  return cipherText.toString()
}
export const encryptUserSignature = userSignature => {
  const cipherText = cryptoJs.AES.encrypt(userSignature, 'k')
  return cipherText.toString()
}
