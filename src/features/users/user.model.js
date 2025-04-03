import userSchema from "./user.schema.js";
import mongoose from "mongoose";

let UserModel = mongoose.model("user", userSchema);

export default class UserRepository {

  async getById(id) {
    try {
      let user = await UserModel.findById(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(userName,email,password) {
    try {
      let user = new UserModel({userName,email,password});
      let saveduser = await user.save()
      return saveduser;
    } catch (error) {
      console.log(error);
    }
  }

  async loginModel(email,password) {
    try {
      let user = await UserModel.findOne({email});
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
