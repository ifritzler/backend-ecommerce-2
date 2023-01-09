import UserDao from "../daos/users.dao.js";

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
    // TODO: Añadir DTO para validacion de data
    const newUser = await this.dao.create(data);
    return newUser;
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
