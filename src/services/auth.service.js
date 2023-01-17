const bcrypt = require("bcrypt");
const userService = require("./user.service");

class AuthService {
  constructor() {
    this.userService = userService;
  }

  async login(email, password) {
    const user = await this.userService.getById(email);
    if (!user) return false;
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return false;

    return user;
  }
}

module.exports = new AuthService();
