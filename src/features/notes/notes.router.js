import express from 'express';
import NotesControler from './notes.controller.js';
import jwtAuth from '../../middlewares/jwt.authmidleware.js';
let notesRouter = express.Router();
let notesController = new NotesControler()


notesRouter.get('/',jwtAuth,(req,res,next)=>{
    notesController.getNotesControler(req,res,next)
})

notesRouter.get('/:id',jwtAuth,(req,res,next)=>{
    notesController.getNoteByIdController(req,res,next)
})

notesRouter.get('/category/:category',jwtAuth,(req,res,next)=>{
    notesController.getNoteByCategoryController(req,res,next)
})

notesRouter.post('/',jwtAuth,(req,res,next)=>{
    notesController.createNotesController(req,res,next)
})

notesRouter.delete('/:id',jwtAuth,(req,res,next)=>{
    notesController.deleteNotesController(req,res,next)
})

notesRouter.put('/:id',jwtAuth,(req,res,next)=>{
    notesController.updateNoteController(req,res,next)
})

notesRouter.patch('/:id',jwtAuth,(req,res,next)=>{
    notesController.switchArchiveController(req,res,next)
})
export default notesRouter 