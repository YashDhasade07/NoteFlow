import express from 'express';
import cors from 'cors'
import { connectToMongoose } from './src/config/mongoose.js';
import userRouter from './src/features/users/user.router.js';
import notesRouter from './src/features/notes/notes.router.js';
import sharedNotesRouter from './src/features/shared/sharedNotes.router.js';
import ApplicationError from './src/middlewares/applicationError.js';
import jwtAuth from './src/middlewares/jwt.authmidleware.js';
let app = express();

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/notes',jwtAuth, notesRouter)
app.use('/shared',jwtAuth, sharedNotesRouter)

app.use((err,req,res,next)=>{
    console.log(err)
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message)
    }
    res.status(500).send('Something went wrong')
})


app.use((req,res)=>{
    res.status(500).send('Request API not found')
})
app.listen(3200,()=>{
    console.log(`Server connected to port 3200`)
    connectToMongoose()
})