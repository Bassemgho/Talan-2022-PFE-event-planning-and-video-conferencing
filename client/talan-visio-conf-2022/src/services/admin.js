import axios from 'axios'
const URL = "http://localhost:5000/allusers"
export const fetsh_all = async (token) => {
    const config = {headers:{Authorization:`Bearer ${token}` }}
    console.log(config)
    const users = await axios.get(URL,config)
    return users;
 }