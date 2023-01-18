const mongoose = require("mongoose");
const { NotValidUuidError } = require("../common/errors");
const createError = require("../common/errors/createError");

class ContainerMongo {
  constructor(collectionName, collectionSchema) {
    this.model = mongoose.model(collectionName, collectionSchema);
  }

  async all() {
    try {
      return this.model.find({});
    }catch (e) {
      throw createError(e);
    }
  }

  async getById(id) {
    try {
      return this.model.findById(id);
    } catch (error) {
      throw createError(error);
    }
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, changes) {
    try {
      const found = await this.model.findById(id);
      return this.model.findByIdAndUpdate(id, changes, {
        new: "true",
      });
    } catch (e) {
      throw new createError(e);
    }
  }

  async remove(id) {
    try {
      await this.model.findByIdAndDelete(id);
    } catch (err) {
      throw new createError(err);
    }
  }
}

module.exports = ContainerMongo;
