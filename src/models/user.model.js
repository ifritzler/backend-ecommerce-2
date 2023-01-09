import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const userCollectionName = "User";

export const userSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(data.password, 10);
  return next();
});

userSchema.method("isValidatePassword", async (plainPassword) => {
  const validate = await bcrypt.compare(plainPassword, this.password);
  return validate;
});

export const userModel = mongoose.model(userCollectionName, userSchema);
