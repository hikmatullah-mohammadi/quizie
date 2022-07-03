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

export const formatCategories = category => {
  const c = {
    "arts_and_literature": "Arts & Literature" ,
    "film_and_tv": "Film & TV" ,
    "food_and_drink": "Food & Drink",
    "general_knowledge": "General Knowledge",
    "geography": "Geography",
    "history": "History",
    "music": "Music",
    "science": "Science",
    "society_and_culture": "Society & Culture",
    "sport_and_leisure": "Sport & Leisure",
  }
  return c[category]
}