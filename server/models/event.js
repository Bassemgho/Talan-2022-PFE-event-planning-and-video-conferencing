import mongoose from "mongoose";
import users from './user.js'
const eventSchema = mongoose.Schema({
    titre:{
        type:"String",
        required:[true,'please insert event title']

    },
    dateDebut:{
        type:Date,
        required:[true,'please add event date']
    },
    dateFin:{
        type:Date,
        required:[true,'please add event date']
    },
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    mods:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    //to add votes in the future
    //to add messages
    //to addfeetback in future
})
// eventSchema.pre('save',async function (next){
//     if(this.isModified('participants')){
//         const l = []
//         this.participants.map((val,index) => { 
//             users.findOne
//          })
//     }
// })
const events = mongoose.model('events',eventSchema)
export default events;