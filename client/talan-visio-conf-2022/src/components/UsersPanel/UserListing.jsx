import React,{useState,useEffect} from 'react'
import ListElement from './ListElement'
import { Stack } from '@chakra-ui/react'
import {fetsh_all} from "../../services/admin"
export default function UserListing({users,setusers}) {
  const data = [
    {name:"Bassem Elghoul",job:"Software engineer",},
    {name:"Bassem Elghoul",job:"Software engineer",},
    {name:"Bassem Elghoul",job:"Software engineer",}]
    // const [users,setusers] = useState([])
    const token = localStorage.getItem('token')
    const refreshUsers = async () => {
      try {
        const all = await fetsh_all(token)
      setusers(all.data.users)
      } catch (error) {
        console.log(error.message)
      }
      
    }
  useEffect(() => { 
    const fetshData = async (token) => {
      try {
        const all = await fetsh_all(token)
        setusers(all.data.users)
        } catch (error) {
          console.log(error.message)
        }
    }
    fetshData(token);       
   },[])
  return (
    <Stack spacing={5} >
    {users.map((val,index) => { 
      return (
        <ListElement key={index} name={val.email} job={(val.job)} />
      )
     })}
    </Stack>      
  )
}