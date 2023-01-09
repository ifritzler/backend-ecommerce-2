import { ContainerMongo } from "../containers/ContainerMongo.js";

//TODO: modificar para traer los schemas de productos
import { userCollectionName, userSchema } from "../models/user.model.js";

class ProductsDao extends ContainerMongo {
  constructor() {
    super(userCollectionName, userSchema);
  }
}

export default ProductsDao;
