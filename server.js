import express from 'express';
import cors from 'cors'
import { connectToMongoose } from './src/config/mongoose.js';
import userRouter from './src/features/user.router.js';

let app = express();

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)




app.listen(3200,()=>{
    console.log(`Server connected to port 3200`)
    connectToMongoose()
})