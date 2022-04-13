import axios from "axios"

const SigninUrl = "http://localhost:5000/auth/signin"
const addUserUrl = "http://localhost:5000/auth/addUser"
const forgotUrl = 'http://localhost:5000/auth/forgotpassword'
// const forgotUrl = 'http://localhost:5000/auth/resetpassword/:token'

export const resetpassword = async (token) => { 
   return await axios.put(`http://localhost:5000/auth/resetpassword/${token}`)
 }
export const forgotpassword = async (email) => {   
   return await axios.post(forgotUrl,{email})
 }

export const sendcreds = async (email,password) => { 
    const creds = {email:email,password:password}
    return await axios.post(SigninUrl,creds)
 }
 export const adduser =  async (token,email,password,firstname,lastname) => { 
    const config = {headers:{Authorization:`Bearer ${token}`}}
    const data = {email:email,password:password,firstname,lastname}
    return await axios.post(addUserUrl,data,config)
  }