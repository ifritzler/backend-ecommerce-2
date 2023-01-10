import UserDao from "../daos/users.dao.js";
import UserDTO from "../dtos/user.dto.js";

class UserService {
  constructor() {
    this.dao = new UserDao();
  }

  async all() {
    const users = await this.dao.all();
    return users;
  }

  async getById(email) {
    const user = await this.dao.findByEmail(email);
    return user;
  }

  async create(data) {
    const userDto = new UserDTO(data);
    try {
      // TODO: Añadir DTO para validacion de data
      if (userDto.validate()) {
        return await this.dao.create(userDto.data);
      }
      // Errors are here
      return userDto;
    } catch (err) {
      console.log(err.code);
      if (err.code === 11000) {
        throw new Error("Email exists yet");
      }
      throw err;
    }
  }

  async update(id, changes) {
    // TODO: Añadir DTO para validacion de changes
    const userUpdated = await this.dao.update(id, changes);
    return userUpdated;
  }

  async remove(id) {
    await this.dao.remove(id);
  }
}

export default new UserService();
