const { validate, Validator } = require('app/api/common')
const { body } = validate

class NotesValidator extends Validator {
  async create(req) {
    const validations = [
      body('title').notEmpty().isLength(1, 64),
      body('message').notEmpty().isLength(1, 256),
    ]
    await this.validate(req, validations, { sanitize: 'query' })
  }
}

module.exports = new NotesValidator()
