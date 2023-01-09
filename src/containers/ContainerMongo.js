import mongoose from "mongoose";
import { DoesNotExistsError, NotValidUuidError } from "../common/errors.js";

export class ContainerMongo {
  constructor(collectionName, collectionSchema) {
    this.model = mongoose.model(collectionName, collectionSchema);
  }

  async all() {
    const entities = await this.model.find({});
    return entities;
  }

  async getById(id) {
    try {
      const found = await this.model.findById(id);
      if (!found) throw new DoesNotExistsError();
      return found;
    } catch (error) {
      throw new NotValidUuidError(id);
    }
  }

  async create(data) {
    const newEntity = await this.model.create(data);
    return newEntity;
  }

  async update(id, changes) {
    try {
      const updated = this.model.findByIdAndUpdate(id, changes, {
        new: "true",
      });
      if (!updated) throw new DoesNotExistsError();
      return updated;
    } catch (error) {
      throw new NotValidUuidError(id);
    }
  }

  async remove(id) {
    try {
      await this.model.findByIdAndDelete(id);
    } catch (err) {}
  }
}
