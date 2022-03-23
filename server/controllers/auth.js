import users from "../models/user.js";
import errorResponse from "../utils/errorResponse.js";

export const addUser = async (req, res, next) => {

    const { email, password } = req.body
    try {
        const user = await users.create({ email, password })
        sendToken(user, 201, res)
    } catch (error) {
        next(error);
    }

}
export const signin = async (req, res, next) => {
    
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorResponse("please provide a valid credentials", 404))
    }
    try {
        const user = await users.findOne({ email }).select("+password")
        if (!user) {
            return next(new errorResponse("no user was found", 404))
        }
        const isMatch = user.matchpasswords(password)
        if (!isMatch) {
            return (next("password is incorrect", 401));
        }
        sendToken(user, 200, res);
    } catch (error) {
        next(error)
    }
}
const sendToken = (user, code, res) => {
    const token = user.getsignedtoken();
    res.status(code).json({ success: true, token })
}