import joi from 'joi'
import { decryptUserSignature } from './utils.js'

export default class EntryValidations {
  static validateStartQuiz ({numberOfQuestions, difficulty, category}) {
    const entry = {
      numberOfQuestions,
      difficulty,
      category
    }
    const schema = joi.object({
      numberOfQuestions: joi.number().min(1).max(10).required(),
      difficulty: joi.string().required().equal("easy", "medium", "hard"),
      category: joi.string().required(),
    })
    const result = schema.validate(entry)
    if (result.error){
      return {
        status: 'invalid',
        errMsg: [
          ...result.error.details.map(item => item.message)
        ]
      }
    }
    return { status: 'valid'}
  }

  static validateSubmitAnswers (answers) {
    const schema = joi.array().min(1).max(10).required()
    const result = schema.validate(answers)
    if (result.error) {
      return {
        status: 'invalid',
        errMsg: [
          ...result.error.details.map(item => item.message)
        ]
      }
    }
    return {status: 'valid'}
  }
  
  static validateUserIdAndSignature (user_id, user_signature) {
    const origUserSignature = decryptUserSignature(user_signature)
    const schema = joi.string().required().equal(user_id)

    const result = schema.validate(origUserSignature)
    if (result.error) {
      return {
        status: 'invalid',
        errMsg: [
          ...result.error.details.map(item => item.message)
        ]
      }
    }
    return { status: 'valid' }
  }
}
