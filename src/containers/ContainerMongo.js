const mongoose = require("mongoose");
const { NotValidUuidError } = require("../common/errors");

class ContainerMongo {
  constructor(collectionName, collectionSchema) {
    this.model = mongoose.model(collectionName, collectionSchema);
  }

  async all() {
    return this.model.find({});
  }

  async getById(id) {
    try {
      const found = await this.model.findById(id);
      if (!found) return false;
      return found;
    } catch (error) {
      throw new NotValidUuidError(id);
    }
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, changes) {
    try {
      const updated = this.model.findByIdAndUpdate(id, changes, {
        new: "true",
      });
      if (!updated) return false;
      return updated;
    } catch (error) {
      throw new NotValidUuidError(id);
    }
  }

  async remove(id) {
    try {
      await this.model.findByIdAndDelete(id);
    } catch (err) {
      throw new NotValidUuidError(id);
    }
  }
}

module.exports = ContainerMongo;
