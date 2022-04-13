import React,{useState,useEffect} from 'react'
import { FormControl,Box,Stack,Flex,Avatar,AvatarGroup,Icon ,Text,Input,Button} from '@chakra-ui/react'
import { fetsh_all } from '../../services/admin'
import 'react-datepicker/src/stylesheets/datepicker.scss'
// import 'react-datepicker/src/stylesheets/variables.scss'
// import 'react-datepicker/src/stylesheets/datepicker-cssmodules.scss'
import DatePicker from 'react-datepicker'
// import DatePicker from 'sassy-datepicker';
// import { DatePicker } from  'react-dater'
import  'react-dater/dist/index.css'
import AddEvent from './AddEvent'
export default function EventsPanel() {
  const token = localStorage.getItem('token')
  const [open, setOpen] = useState(false)
  const [users,setusers] = useState({})
  const [dates, setDates] = useState({
  

    checkin:  new  Date('2022-03-28'),
    
    checkout:  new  Date('2022-04-28')
    
    })
 
 
  const [startDate, setStartDate] = useState(new Date());
  return (
    // <div>EventsPanel</div>
    <Box>
    
  <AddEvent  />
  </Box>
  )
}
