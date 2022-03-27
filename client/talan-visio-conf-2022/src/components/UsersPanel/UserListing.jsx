import React,{useState} from 'react'
import ListElement from './ListElement'
import { Stack } from '@chakra-ui/react'
export default function UserListing() {
  const data = [
    {name:"Bassem Elghoul",job:"Software engineer",},
    {name:"Bassem Elghoul",job:"Software engineer",},
    {name:"Bassem Elghoul",job:"Software engineer",}]
  return (
    <Stack spacing={5} >
    {data.map((val,index) => { 
      return (
        <ListElement key={index} name={val.name} job={val.job} />
      )
     })}
    </Stack>      
  )
}