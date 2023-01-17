const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userCollectionName = "User";

async function isValidPassword(plainPassword) {
  await bcrypt.compare(plainPassword, this.password, (err, matched) => matched);
}

async function hashPassword(next) {
  this.password = await bcrypt.hash(this.password, 10);
  return next();
}

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", hashPassword);
userSchema.method("isValidatePassword", isValidPassword);

const userModel = mongoose.model(userCollectionName, userSchema);

module.exports = {
  userSchema,
  userModel,
  userCollectionName,
};
