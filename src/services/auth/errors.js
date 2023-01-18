const ApplicationError = require('../../common/errors/ApplicationError');

const errors = {
  AUTH_INVALID_CREDENTIALS: {
    type: ApplicationError.type.APP_NAME,
    code: 'AUTH_INVALID_CREDENTIALS',
    message: 'Username / email or password maybe incorrect. Please verify.',
    statusCode: 400
  },
  AUTH_WEAK_PASSWORD: {
    type: ApplicationError.type.APP_NAME,
    code: 'AUTH_WEAK_PASSWORD',
    message: 'The given password is easy to guess, provide strong password',
    statusCode: 400
  },
  AUTH_EMAIL_HAS_BEEN_TAKEN: {
    type: ApplicationError.type.APP_NAME,
    code: 'AUTH_EMAIL_HAS_BEEN_TAKEN',
    message: 'Emails is already exists. Please choose another one.',
    statusCode: 409
  }
}

module.exports = errors;