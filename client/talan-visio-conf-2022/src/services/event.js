import axios from 'axios'
const URLEv = "http://localhost:5000/events/user"

export const fetshuserdata = async (token)=>{
  const config = {headers:{Authorization:`Bearer ${token}` }}
  const events = await axios.get(`${URLEv}`,config)
  return events
}
