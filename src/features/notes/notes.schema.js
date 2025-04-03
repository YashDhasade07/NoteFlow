import mongoose from "mongoose";

let NoteSchema = mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    title: {type: String, required: true,},
    content: {type: String},
    isArchived: {type: Boolean, default: false},
    categories: [{type: String}],
    createdAt: {type: Date, default : Date.now()},
    updatedAt: {type: Date, default : Date.now() ,}
})

NoteSchema.pre('save', function(next){
    this.updatedAt = new Date();
    next()
})

export default NoteSchema;