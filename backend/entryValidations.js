import joi from 'joi'

export default class EntryValidations {
  static validateStartQuiz ({numberOfQuestions, difficulty, category}) {
    const entry = {
      numberOfQuestions,
      difficulty,
      category
    }
    const schema = joi.object({
      numberOfQuestions: joi.number().min(1).max(10).required(),
      difficulty: joi.string().required(),
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
}
