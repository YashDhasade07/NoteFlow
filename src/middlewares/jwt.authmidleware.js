import jwt from "jsonwebtoken";

let jwtAuth =async (req,res,next) =>{
    try {
        const token = req.headers['authorization']
        if(!token){
            res.status(401).send('unauthorized');
        }   
        let user = jwt.verify(token,'aeshdytrnckdsdhyc')
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
    }
}

export default jwtAuth;