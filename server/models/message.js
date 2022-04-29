import mongoose from 'mongoose'

const messageSchema  = mongoose.Schema({
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
    required:[true,'please provide a sender']
  }

},{timestamps:true})

const messages = mongoose.model('messages',messageSchema)
export default messages;
