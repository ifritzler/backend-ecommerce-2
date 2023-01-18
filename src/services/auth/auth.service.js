const bcrypt = require("bcrypt");
const userService = require("../users/user.service");
const ApplicationError = require('../../common/errors/ApplicationError');
const AuthError = require("./errors");

class AuthService {
  constructor() {
    this.userService = userService;
  }

  async login(email, password) {
    const user = await this.userService.getById(email);
    if (!user) return false;
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new ApplicationError(AuthError.AUTH_INVALID_CREDENTIALS);

    return user;
  }
}

module.exports = new AuthService();
