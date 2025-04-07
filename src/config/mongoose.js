import mongoose from "mongoose";

let url = `mongodb://localhost:27017/notes`
export const connectToMongoose = async()=>{
    try {
        await mongoose.connect(url
            // , {useNewUrlParser: true, useUnifiedTopology: true}
        )
        console.log(`Connected to mongoose`)
    } catch (error) {
        console.log(`Failed to Connect to mongoose` , error)
    }
}