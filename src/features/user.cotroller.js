import UserRepository from "./user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
        }
    }

    async loginController(req,res,next){
        try {
            let {email,password} = req.body;
            let user = await this.userRepository.loginModel(email,password);
            let isPassword = await bcrypt.compare(password,user.password);
            if(isPassword){
            let token = jwt.sign({userName : user.userName, email: user.email}, 'aeshdytrnckdsdhyc',{expiresIn: '3h'})
                console.log(token)
                res.status(200).send(`loged in sucessfully your token is: ${token}`)
            }else{
                res.status(400).json('incorrect credentials')
            }
        } catch (error) {
            console.log(error)
        }
    }

    // async loginController(req,res,next){
    //     try {
    //         // console.log('hii')
    //         let {userName,email,password} = req.body;
    //         let hashedPassword = await bcrypt.hash(password,10)
    //         let user = await this.userRepository.createUser(userName,email,hashedPassword);
    //         res.status(200).json(user)
    //         // res.status(200).send('user created sucessfully')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}