import { ContainerMongo } from "../containers/ContainerMongo.js";
import { userCollectionName, userSchema } from "../models/user.model.js";

class UserDao extends ContainerMongo {
  constructor() {
    super(userCollectionName, userSchema);
  }

  findByEmail(email) {
    const user = this.model.findOne({ email: email });
    return user;
  }
}

export default UserDao;
