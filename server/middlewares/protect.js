import users from "../models/user.js"
import errorResponse from "../utils/errorResponse.js"
import jwt from "jsonwebtoken"

const protect = (req,res,next) => { 
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return next(new errorResponse("no token was found",401))
    }
    try {
        const decoded = jwt.verify(token,"secretcode");
        // trying to find the user with decoded id
        const user = user.findOne({_id:decoded.id})
        if(!user){
            console.log("no user was found")
            return next(new errorResponse("no usr was found",404))
        }
        //attach user to req
        req.user = user
        next()
    } catch (error) {
        return (next(new errorResponse("not authorized on this route",401)))
    }
 }
 export default protect;