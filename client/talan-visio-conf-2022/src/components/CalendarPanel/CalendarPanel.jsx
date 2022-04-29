import React,{useState,useEffect} from 'react'
import { Box, Flex, Stack ,useDisclosure,Button} from '@chakra-ui/react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
// import Calend,{CalendarView} from 'calend'
import 'calend/dist/styles/index.css'
import Kalend, { CalendarView } from 'kalend' // import component
import 'kalend/dist/styles/index.css'; // import styles
// import './kalendar.css'
import {fetshuserdata} from '../../services/event'
export default function CalendarPanel() {
  const localizer = momentLocalizer(moment)
  const [token,setToken] = useState(localStorage.getItem('token'))
  const [evts,setEvts] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const eventsRef = React.useRef()
  //selected event
  const [title,setTitle] = useState('')
  const [id,setid] = useState('')

  let events
  const fetshuserevents = async (token)=>{
    try {
      const ev = await fetshuserdata(token)

      setEvts(ev.data.events)
      // eventsRef.current = ev
    } catch (e) {
      console.log(e.message)
    }
  }
  useEffect(()=>{
    fetshuserevents(token)
    // events = displayevents()
    // console.log(events);
  },[])
const getColor = ()=>{
  const colors = ["#fef65b","#5b63fe","#fe5b63","#fea55b","#b5fe5b"]
  let color = colors[Math.floor(Math.random()*colors.length)];
  return color

}
//open in a new tab
const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}
const onJoin = ()=>{
  openInNewTab(`http://localhost:3000/rooms/${id}`)
  onClose()
}
const handleEvent = (e)=>{
  console.log('hiiii',e.titre);
  setTitle(e.titre)
  setid(e._id)
  onOpen();


}
const displayevents = ()=>{
    const events =[]
    // console.log(evts);
    evts.map((val,index)=>{

    const newObject = {};
    delete Object.assign(newObject, val, {['startAt']: val['dateDebut'] })['dateDebut'];
    delete Object.assign(newObject, val, {['endAt']: val['dateFin'] })['dateFin'];
    newObject.id=index+1
    newObject.summary=val.titre
    newObject.color=getColor()
    console.log('obj',newObject);
    events.push(newObject)
    // console.log(events)
  })
  return events;
}


  // const events = [
  //     {
  //         id: 1,
  //         startAt: '2022-04-21T18:00:00.000Z',
  //         endAt: '2022-04-25T19:00:00.000Z',
  //         timezoneStartAt: 'Europe/Berlin', // optional
  //         summary: 'test',
  //         color: 'blue',
  //         calendarID: 'work'
  //     },
  //     {
  //         id: 2,
  //         startAt: '2022-04-28T18:00:00.000Z',
  //         endAt: '2022-04-29T19:00:00.000Z',
  //         timezoneStartAt: 'Europe/Berlin', // optional
  //         summary: 'test',
  //         color: 'blue'
  //     }
  // ]
  return (
    < Stack >
      {/* <AddUserModal /> */}
      {/* <UserListing /> */}

        <Box borderRadius={5} bg="white" style = {{height:"100vh"}} >

        <Kalend
        style = {{height:"100vh"}}
    events={displayevents()}
    initialView={CalendarView.MONTH}
    onEventClick={handleEvent}
    onNewEventClick={function noRefCheck(){}}
    hourHeight={60}
      timezone={'Europe/Berlin'}
      draggingDisabledConditions={{
        summary: 'test',
        allDay: false,
        color: 'blue',
      }}
  />

        </Box>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Join Event : {title||'no name'}
              </AlertDialogHeader>

              <AlertDialogBody>
                Do you want to join this event right now.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='green' onClick={onJoin} ml={3}>
                  Join
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

    </Stack>
  )
}
