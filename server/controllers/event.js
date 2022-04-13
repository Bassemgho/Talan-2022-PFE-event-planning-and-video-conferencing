import events from "../models/event.js";
import users from "../models/user.js"
import errorResponse from '../utils/errorResponse.js'
// import transport from "../utils/transport.js";
// import transport from "../utils/transport.js";
import {sendMail} from '../utils/transport.js'
export const addEvent = async (req, res, next) => {
    let {titre,participants,mods,dateDebut,dateFin} = req.body
    try {
        console.log(titre,participants,mods,dateDebut,dateFin)
        if(!titre||!participants||!mods||!dateDebut||!dateFin){
            return next(new errorResponse('validation error',400))
        }
        dateDebut = new Date(dateDebut)
        dateFin = new Date(dateFin)
        const usrs = await users.find({email:{$in:participants}},{_id:1})
        usrs.map((val,ind) => { 
            usrs[ind]  = val._id
         })
        console.log(usrs)
        const event = await events.create({titre,participants:usrs,mods:usrs,dateDebut,dateFin})
      
        // send emails to participants and mods
        const data = {
            to: participants,
            // from: email,
            // template: 'forgot-password-email',
            subject: 'you are invited to an event!',
            html:  `<p>Hello </strong><span style="text-transform:uppercase">${req.body.firstname}</span><strong></strong>, <p/>
                <p>link will be provided soon <br/>
                <ul>
                <li>Event title : \n<b>${event.titre} </li> <br/>
                <li>Event date : \n<b>${event.dateDebut} </li> <br/>
                <li>Event dateF : \n<b>${event.dateFin} </li> <br/>
                
                </ul>
                Best regards.
                </p>` 
        }
        sendMail(data,next)
        
        return res.status(201).json({success:true,message:usrs})

    } catch (error) {
        next(error)
    }

}
export const deleteEvent = async (req, res, next) => {
    const id = req.body
    try {
        const event = await events.findOneAndDelete({_id:id})
        if(event){
            // send emails to participants and mods
        const data = {
            to: participants,
            // from: email,
            
            subject: 'you are invited to an event!',
            html:  `<p>Hello </strong><span style="text-transform:uppercase">${req.body.firstname}</span><strong></strong>, <p/>
                <p>you are invited to the event : ${event.title} <br/>
                <ul>
                <li>Your Email is : \n<b>${req.body.email} </li> <br/>
                
                </ul>
                Best regards.
                </p>` 
        }
            return res.status(201).json({success:true,message:"the event has been successfulyy removed"})
        }
        res.status(404).json({success:false,message:"there is no event "})
    } catch (error) {
        
    }
}
export const modifyEvent = (req, res, next) => {

}