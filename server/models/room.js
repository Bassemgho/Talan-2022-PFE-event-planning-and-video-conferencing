import mongoose from 'mongoose'

const roomSchema = mongoose.Schema({

  messages:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'messages'
  },
  files:{
    type:['String'],
  }

})

const rooms = mongoose.model('rooms',roomSchema);
export default rooms
