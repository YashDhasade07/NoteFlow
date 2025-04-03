import jwt from "jsonwebtoken";

let jwtAuth =async (req,res,next) =>{
    try {
        const token = req.headers['authorization']
        // console.log(111111111111111111111);
        // console.log(token)
        if(!token){
            res.status(401).send('unauthorized');
        }
    
        let user = jwt.verify(token,'aeshdytrnckdsdhyc')
        req.user = user;
        // console.log(222222222222222222222);;
        // console.log(user);
        next()
    } catch (error) {
        console.log(error)
    }
}

export default jwtAuth;