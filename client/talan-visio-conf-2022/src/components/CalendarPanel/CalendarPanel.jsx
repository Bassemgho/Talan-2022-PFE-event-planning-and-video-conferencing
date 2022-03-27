import React from 'react'
import { Box, Flex, Stack } from '@chakra-ui/react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Calend,{CalendarView} from 'calend'
import 'calend/dist/styles/index.css'
// import Kalend, { CalendarView } from 'kalend' // import component
import 'kalend/dist/styles/index.css'; // import styles
// import './kalendar.css'

export default function CalendarPanel() {
  const localizer = momentLocalizer(moment)
  const events = {
    '01-11-2021': [
        {
        id: 1,
        startAt: '2021-11-21T18:00:00.000Z',
        endAt: '2021-11-21T19:00:00.000Z',
        timezoneStartAt: 'Europe/Berlin', // optional
        summary: 'test',
        color: 'blue',
        }
    ],
    '21-11-2021': [
        {
        id: 2,
        startAt: '2021-11-21T18:00:00.000Z',
        endAt: '2021-11-21T19:00:00.000Z',
        timezoneStartAt: 'Europe/Berlin', // optional
        summary: 'test',
        color: 'blue',
        }
    ]
}
  return (
    < Stack >
      {/* <AddUserModal /> */}
      {/* <UserListing /> */}
      
        <Box borderRadius={5} bg="white" style = {{height:"100vh"}} >
        
        <Calend 
        style = {{height:"100vh"}}
    events={{}}
    initialView={CalendarView.MONTH}
    onEventClick={function noRefCheck(){}}
    onNewEventClick={function noRefCheck(){}}
    hourHeight={60}
      timezone={'Europe/Berlin'}
  />
        </Box>
      

    </Stack>
  )
}
