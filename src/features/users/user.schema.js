import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default : Date.now()}
})

// userSchema.index({ email: 1 });
export default userSchema;