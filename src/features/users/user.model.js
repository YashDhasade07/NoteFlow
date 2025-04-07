import ApplicationError from "../../middlewares/applicationError.js";
import userSchema from "./user.schema.js";
import mongoose from "mongoose";

let UserModel = mongoose.model("user", userSchema);

export default class UserRepository {
  async getById(id) {
    try {
      let user = await UserModel.findById(id).select(
        "userName email createdAt"
      );
      console.log("hii",user);
      return user;
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        throw error;
      }
      throw new ApplicationError(
        "Something went wrong while fetching the user",
        400
      );
    }
  }

  async createUser(userName, email, password) {
    try {
      let user = new UserModel({ userName, email, password });
      let saveduser = await user.save();
      return saveduser;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "Something went wrong while creating the user",
        400
      );
    }
  }

  async loginModel(email) {
    try {
      let user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong while logging in", 400);
    }
  }
}
