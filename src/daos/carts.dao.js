const ContainerMongo = require("../containers/ContainerMongo");

const { userCollectionName, userSchema } = require("../models/user.model");

class CartsDao extends ContainerMongo {
  constructor() {
    super(userCollectionName, userSchema);
  }
}

module.exports = CartsDao;
