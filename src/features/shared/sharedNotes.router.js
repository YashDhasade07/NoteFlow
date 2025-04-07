import express from 'express';
import SharedNoteControler from "./sharedNotes.controller.js"
// import jwtAuth from '../../middlewares/jwt.authmidleware.js';
let sharedNotesRouter = express.Router();
let sharedNotesController = new SharedNoteControler()


sharedNotesRouter.get('/',(req,res,next)=>{
    sharedNotesController.getSharedNoteToMeController(req,res,next)
})

sharedNotesRouter.post('/',(req,res,next)=>{
    sharedNotesController.createSharedNoteControler(req,res,next)// not working yet
})

sharedNotesRouter.delete('/:id',(req,res,next)=>{
    sharedNotesController.removeSharedAccessController(req,res,next)
})

sharedNotesRouter.put('/:id',(req,res,next)=>{
    sharedNotesController.updateSharedNote(req,res,next)
})

sharedNotesRouter.patch('/:id',(req,res,next)=>{
    sharedNotesController.updateAccessController(req,res,next)
})
export default sharedNotesRouter 