import mongoose, { Schema, Types } from "mongoose";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
const schema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      min: [2, "userName must be more than 2 letters"],
      max: [50, "userName must be less than 50 letters"],
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      minLenght: [10, "email is too short"]
    },
    password: {
      type: String,
      required: true,
      minLenght: [8, "password is too short"]
    }
  },
  { timestamps: true }
);



schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
    return next();
  }
  return next();
});
schema.methods.generateToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};
schema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};
const userModel = mongoose.model("user", schema);

export default userModel;
