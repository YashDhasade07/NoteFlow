import express from 'express';
import SharedNoteControler from "./sharedNotes.controller.js"
import jwtAuth from '../../middlewares/jwt.authmidleware.js';
let sharedNotesRouter = express.Router();
let sharedNotesController = new SharedNoteControler()


sharedNotesRouter.get('/',jwtAuth,(req,res,next)=>{
    sharedNotesController.getSharedNoteToMeController(req,res,next)
})

// notesRouter.get('/:id',jwtAuth,(req,res,next)=>{
//     notesController.getNoteByIdController(req,res,next)
// })

// notesRouter.get('/category/:category',jwtAuth,(req,res,next)=>{
//     notesController.getNoteByCategoryController(req,res,next)
// })

sharedNotesRouter.post('/',jwtAuth,(req,res,next)=>{
    sharedNotesController.createSharedNoteControler(req,res,next)// not working yet
})

// notesRouter.delete('/:id',jwtAuth,(req,res,next)=>{
//     notesController.deleteNotesController(req,res,next)
// })

sharedNotesRouter.put('/:id',jwtAuth,(req,res,next)=>{
    sharedNotesController.updateSharedNote(req,res,next)
})

// notesRouter.patch('/:id',jwtAuth,(req,res,next)=>{
//     notesController.switchArchiveController(req,res,next)
// })
export default sharedNotesRouter 