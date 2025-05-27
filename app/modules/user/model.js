const { Model } = require('app/modules/common')

class UserModel extends Model {
  schema() {
    return {
      firstName: {
        type: String,
        trim: true,
        required: true
      },
      lastName: {
        type: String,
        trim: true,
        required: true
      },
      email: {
        type: String,
        trim: true,
        required: true,
        index: {
          unique: true
        }
      },
      notes: [{
        type: String,
        ref: 'Notes',
        required: false
      }],
    }
  }
}

module.exports = UserModel
