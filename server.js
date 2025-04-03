import express from 'express';
import cors from 'cors'
import { connectToMongoose } from './src/config/mongoose.js';
import userRouter from './src/features/users/user.router.js';
import notesRouter from './src/features/notes/notes.router.js';
import sharedNotesRouter from './src/features/shared/sharedNotes.router.js';

let app = express();

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/notes', notesRouter)
app.use('/shared', sharedNotesRouter)



app.listen(3200,()=>{
    console.log(`Server connected to port 3200`)
    connectToMongoose()
})