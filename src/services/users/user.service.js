const logger = require("../../common/logger");

const UserDao = require("../../daos/users.dao");
const UserDTO = require("../../dtos/user.dto");

class UserService {
  constructor() {
    this.dao = new UserDao();
  }

  async all() {
    return this.dao.all();
  }

  async getById(email) {
    return this.dao.findByEmail(email);
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
      logger.error(err.message);
      if (err.code === 11000) {
        throw new Error("Email exists yet");
      }
      throw err;
    }
  }

  async update(id, changes) {
    // TODO: Añadir DTO para validacion de changes
    return this.dao.update(id, changes);
  }

  async remove(id) {
    await this.dao.remove(id);
  }
}

module.exports = new UserService();
