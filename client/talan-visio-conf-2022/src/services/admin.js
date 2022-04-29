import axios from 'axios'
const URL = "http://localhost:5000/allusers"
const eventUrl = "http://localhost:5000/events/all"
const addeventUrl = "http://localhost:5000/events/addevent"
const eventdeleteurl = "http://localhost:5000/events/delete"

export const deleteevent = async (token,id)=>{
  const config = {headers:{Authorization:`Bearer ${token}` }}
  const data = await axios.post(eventdeleteurl,{id},config)
  return data
}
export const fetsh_all = async (token) => {
    const config = {headers:{Authorization:`Bearer ${token}` }}
    console.log(config)
    const users = await axios.get(URL,config)
    return users;
 }
 export const fetsh_all_events= async (token) => {
    const config = {headers:{Authorization:`Bearer ${token}` }}
    const events = await axios.get(eventUrl,config)
    return events

  }
  export const add_event=async (token,data) => {
    const config = {headers:{Authorization:`Bearer ${token}` }}
    const res = await axios.post(addeventUrl,data,config)
    return res;
   }
