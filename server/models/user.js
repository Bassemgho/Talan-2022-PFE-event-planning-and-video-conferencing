import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    email:{
        type:'String',
        required : [true,'please provide an email'],
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
        ]
    },
    password:{
        type:'String',
        required:[true,"please provide a password"],
        minlength:6,
        select:false,
    },
    resetpasswordtoken:'String',
    resetpasswordexpire:Date,   

})
userschema.index({ email: 1}, { unique: true })
userSchema.pre("save",async function (next){
    if(!this.isModiefied("password")){
        next();
    }
    const salt = bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next();
})
userSchema.methods.matchpasswords = async function(password){
    return await bcrypt.compare(password,this.password)

}
userSchema.methods.getsignedtoken = function(){
    return jwt.sign({id:this._id},"secretcode",{expiresIn:"60min"})

}
const users = mongoose.model("users",userSchema);
users.createIndexes()
export default users;