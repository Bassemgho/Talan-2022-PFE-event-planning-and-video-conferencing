import React ,{useState,useEffect}from 'react'
import {Box,Stack,Flex} from '@chakra-ui/react'
import EventElement from './EventElement'
export default function EventListing({fetchevents,events,setEvents}) {
  // const [events,setEvents] = useState([])
  const [token,setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {

     fetchevents(token)
   },[token])
   if (events.length==0) {

     return(<Box marginTop={2} padding={10} bg='white'> No events for the moment</Box>)
   } else {

     return (
       <Box
       marginTop={3}
       borderRadius="5px"
       padding={5}
       bg="white"
       overflowY="scroll"
       overflowX="scroll"
       bgSize="200px"
       bgRepeat="repeat"
       alignContent='start'>
       All events
       <Stack width='700px'>
       {events.map((val,index) => {
         return( <EventElement setEvents={setEvents} eventid = {val._id} key={index} titre={val.titre} dateDebut={val.dateDebut} dateFin={val.dateFin}   />)
       })}
       </Stack>
       </Box>
     )
   }
}
