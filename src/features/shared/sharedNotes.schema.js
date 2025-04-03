import mongoose from "mongoose";

let SharedNoteSchema = mongoose.Schema({
    noteId:{type: mongoose.Schema.Types.ObjectId, ref: "note", required: true},
    sharedWith: {type: mongoose.Schema.Types.ObjectId, ref: "note", required: true},
    permission: {type: String, enum: ["read" , "edit"], default: "read"},
    createdAt: {type: Date, default : Date.now()}
})



export default SharedNoteSchema;