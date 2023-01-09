import { ContainerMongo } from "../containers/ContainerMongo.js";

//TODO: modificar para traer los schemas de carrito
import { userCollectionName, userSchema } from "../models/user.model.js";

class CartsDao extends ContainerMongo {
  constructor() {
    super(userCollectionName, userSchema);
  }
}

export default CartsDao;
