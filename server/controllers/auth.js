import users from "../models/user.js";
import errorResponse from "../utils/errorResponse.js";
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
import jwt from 'jsonwebtoken'

const map = { userRole: "6240d8b36d0ad04caca79f00" }

const email = process.env.MAILER_EMAIL_ID || 'talandev2022@gmail.com'
const pass = process.env.MAILER_PASSWORD || 'PFEdev2022'
let transport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
        user: email,
        pass: pass,
    },
});
let handlebarsOptions = {
    viewEngine: {
        extName: ".html",
        partialsDir: path.resolve('../templates'),
        defaultLayout: false
    },
    viewPath: path.resolve('../templates/'),
    extName: '.html'
};
transport.use('compile', hbs(handlebarsOptions))
export const changepassword = async (req,res,next) => { 
    const user = req.user
    const{newpassword} = req.body
    
    try {
        user.password = newpassword
        await user.save()
        res.status(201).json({success:true,message:"you have succefully changed your password"})
    } catch (error) {
        next(error)
    }
 }
export const verifyresettoken = async (req, res, next) => {
    const { token } = req.params
    let secret = process.env.secret || "secretcode";

    try {
        let decoded = jwt.verify(token, secret)
        const user = await users.findOne({ email: decoded.email, resetpasswordtoken: token })
        if (!user) {
            return (res.status(404).json({ success: false, message: "token is invalid" }))
        }
        const usertoken = user.getsignedtoken()
        res.status(201).json({success:true,message:"token is valid,you may proceed to change your password",token:usertoken})
    } catch (error) {
        return (next(error))

    }


}
export const forgot_password = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await users.findOne({ email })
        if (!user) {
            return next(new errorResponse('no user was found', 404))
        }
        let token = user.generateResetToken();

        const data = {
            to: user.email,
            from: email,
            template: 'forgot-password-email',
            subject: 'Password help has arrived!',
            context: {
                url: 'http://localhost:3000/auth/resetpassword/' + token,
                name: user.firstname
            }
        }
        console.log('om heeere  ')

        transport.sendMail(data, function (err) {
            if (!err) {
                return res.status(201).json({ message: 'Kindly check your email for further instructions', success: true, token: token });
            } else {
                return next(err);
            }
        })
        return res.status(201).json({success:true,token:token})
        // next();

    } catch (error) {
        next(error)
    }
}
export const addUser = async (req, res, next) => {

    const { email, password, role, firstname, lastname } = req.body
    try {
        //still need to add user confirmation
        const user = await users.create({ email, password, role: map.userRole, firstname, lastname })
        if(user){
            transport.sendMail({
                to: req.body.email,
                from:email,
                subject:"User Identification",
                html:  `<p>Hello </strong><span style="text-transform:uppercase">${req.body.firstname}</span><strong></strong>, <p/>
                <p>Welcome to to our Event Planning application at TALAN <br/>
                <ul>
                <li>Your Email is : \n<b>${req.body.email} </li> <br/>
                
                </ul>
                Best regards.
                </p>` 
              })
        }
        else{
            return next(new errorResponse('some thing went wrong',501))
        }
        console.log("create")
        sendToken(user, 201, res)
        return
    } catch (error) {
        console.log("err")
        next(error);
    }

}
export const signin = async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorResponse("please provide a valid credentials", 404))
    }
    try {
        const user = await users.findOne({ email }).select("+password").populate("role")
        if (!user) {
            return next(new errorResponse("no user was found", 404))
        }
        const isMatch = user.matchpasswords(password)
        if (!isMatch) {
            return (next("password is incorrect", 401));
        }
        sendToken(user, 200, res);
        return
    } catch (error) {
        next(error)
    }
}
const sendToken = (user, code, res) => {
    const token = user.getsignedtoken();
    res.status(code).json({ success: true, token, role: user.role.titre })
}