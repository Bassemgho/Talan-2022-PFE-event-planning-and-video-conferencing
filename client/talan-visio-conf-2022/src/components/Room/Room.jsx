import React ,{useState,useEffect,useRef} from 'react'
import { Box, Flex, Stack ,useDisclosure,Button} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'
import sockets from '../../socket.js'
 const Room = ()=>{
  const videoRef = useRef()
  console.log('room');
  console.log(sockets);
  return(
    <Box>
      <Flex>
room
      </Flex>
    </Box>
  )
}
export default Room
