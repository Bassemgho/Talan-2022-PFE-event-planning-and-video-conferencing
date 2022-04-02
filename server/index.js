import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors"
import authrouter from "./routes/auth.js"
import errorHandler from "./middlewares/errorHandler.js";
import adminRouter from './routes/admin.js'
const app = express();
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())
app.use(authrouter)
app.use(adminRouter)
app.use("/",(req,res) => { res.status(201).json({
    success:true,
    message:"helloworld"

})
return
})
app.use(errorHandler)
const PORT = process.env.PORT || 5000 ;
// fixer lien mongo
const CONNEXION_URL = "mongodb+srv://pfeuser:pfeuser@cluster0.trqml.mongodb.net/Talan-2022?retryWrites=true&w=majority"
mongoose.connect(CONNEXION_URL)
.then(()=>{app.listen(PORT,console.log(`server  running on port : ${PORT}`))})
.catch((error)=>{console.log(error.message)})

