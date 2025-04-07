import UserRepository from "./user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ApplicationError from "../../middlewares/applicationError.js";

export default class UserController{

constructor(){
    this.userRepository = new UserRepository()
}

    async getByIdController(req,res,next){

        try {
            let id = req.params.id;
            let user = await this.userRepository.getById(id);
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            if(error instanceof ApplicationError){
                next(error)
            }
            next(new ApplicationError("Something went wrong while getting user", 400))
        }
    }

    async createUserController(req,res,next){
        try {
            // console.log('hii')
            let {userName,email,password} = req.body;
            let hashedPassword = await bcrypt.hash(password,10)
            let user = await this.userRepository.createUser(userName,email,hashedPassword);
            res.status(200).json(user)
            // res.status(200).send('user created sucessfully')
        } catch (error) {
            console.log(error)
            if(error instanceof ApplicationError){
                next(error)
            }
            next( new ApplicationError("Something went wrong while creating user", 400))
        }
    }

    async loginController(req,res,next){
        try {
            let {email,password} = req.body;
            let user = await this.userRepository.loginModel(email);
            if(!user){
                throw new ApplicationError("user not found with this credentials", 404)
            }
            let isPassword = await bcrypt.compare(password,user.password);
            if(isPassword){
            let token = jwt.sign({userId : user._id, email: user.email}, 'aeshdytrnckdsdhyc',{expiresIn: '3h'})
                // console.log(token)
                res.status(200).send(`loged in sucessfully your token is: ${token}`)
            }else{
                res.status(401).json('incorrect credentials')
            }
        } catch (error) {
            console.log(error);
            if(error instanceof ApplicationError){
                next(error)
            }
            next( new ApplicationError("Something went wrong while logging in", 400))
        }
    }

}