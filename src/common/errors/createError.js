const ApplicationError = require("./ApplicationError");

function createError(error, overrides) {
  return new ApplicationError(error, overrides);
}
module.exports = createError;