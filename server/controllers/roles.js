import roles from "../models/role.js"
import errorResponse from "../utils/errorResponse.js"

const add_roles = async (req,res,next) => { 
    const {titre} = req.body;
    try {
        const role = await roles.create()
        res.status(201).json({success:true})
        return
    } catch (error) {
        next(error);
    }
 }