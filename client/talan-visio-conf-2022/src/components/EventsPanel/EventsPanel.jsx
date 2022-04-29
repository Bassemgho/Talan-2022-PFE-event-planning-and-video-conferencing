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
import EventListing from './EventListing'
import { fetsh_all_events } from '../../services/admin.js'

export default function EventsPanel() {
  const token = localStorage.getItem('token')
  const [open, setOpen] = useState(false)
  const [users,setusers] = useState({})
  const [dates, setDates] = useState({


    checkin:  new  Date('2022-03-28'),

    checkout:  new  Date('2022-04-28')

    })


  const [startDate, setStartDate] = useState(new Date());
  const [events,setEvents] = useState([])
  const fetchevents = async (token) => {
    try {
console.log("im entiring useeffect /n")
      const res = await fetsh_all_events(token)
      if(res.data.success){
        setEvents(res.data.events)
        console.log('hello',res.data.events)
      }else{
        alert("server couldnt fetsh all events please try again later")
      }

    } catch (error) {
      console.log(error.message)
      alert('some thing is wrong please reload the page' + error.message)
    }

   }

  return (
    // <div>EventsPanel</div>
    <Box height={100} >

  <AddEvent refreshEvents={fetchevents} />
  <EventListing setEvents={setEvents} events={events} fetchevents={fetchevents} />
  </Box>
  )
}
