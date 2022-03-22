import users from "../models/user";

const addUser = async (req,res,next) => { 

    const {email,password} = req.body
    try {
        const  user = await users.create({email,password})
        sendToken(user,201,res)
    } catch (error) {
        next(error);
    }

 }
 const sendToken = (user,code,res) => { 
     const token = user.getsignedtoken();
     res.status(code).json({success:true,token})
  }