import axios from "axios"

const SigninUrl = "http://localhost:5000/signin"
const addUserUrl = "http://localhost:5000/addUser"


export const sendcreds = async (email,password) => { 
    const creds = {email:email,password:password}
    return await axios.post(SigninUrl,creds)
 }
 export const adduser =  async (email,password) => { 
    const creds = {email:email,password:password}
    return await axios.post(addUserUrl,creds)
  }