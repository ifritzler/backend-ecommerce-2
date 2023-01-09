import userService from "./user.service.js";
import bcrypt from "bcrypt";

class AuthService {
  constructor() {
    this.userService = userService;
  }

  async login(email, password) {
    const user = await userService.getById(email);
    if (!user) return false;
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return false;

    return user;
  }

  async register() {
    //TODO: Logica de register
  }
}

export default new AuthService();
