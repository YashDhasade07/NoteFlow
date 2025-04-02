import express from 'express';
import UserController from './user.cotroller.js';
let userRouter = express.Router();
let userController = new UserController()


userRouter.get('/:id',(req,res,next)=>{
    userController.getByIdController(req,res,next);
})
userRouter.post('/',(req,res,next)=>{
    userController.createUserController(req,res,next);
})
userRouter.post('/login',(req,res,next)=>{
    userController.loginController(req,res,next);
})

export default userRouter;