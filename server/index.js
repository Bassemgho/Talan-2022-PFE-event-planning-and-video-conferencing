import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors"

const app = express();
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())
const PORT = process.env.PORT || 5000 ;
const CONNEXION_URL = ""
mongoose.connect(CONNEXION_URL,{useNewUrlParser: true , useUnifiedTopology:true,audoIndex: true})
.then(()=>{app.listen(PORT,console.log(`server  running on port : ${PORT}`))})
.catch((error)=>{console.log(error.message)})
mongoose.set('useFindAndModify',false);
