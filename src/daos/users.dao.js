const ContainerMongo = require("../containers/ContainerMongo");
const { userCollectionName, userSchema } = require("../models/user.model");

class UserDao extends ContainerMongo {
  constructor() {
    super(userCollectionName, userSchema);
  }

  async findByEmail(email) {
    return this.model.findOne({ email });
  }
}

module.exports = UserDao;
