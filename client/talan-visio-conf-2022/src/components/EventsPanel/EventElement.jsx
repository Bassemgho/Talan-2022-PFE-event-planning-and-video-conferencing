import React ,{useState,useEffect}from 'react'
// import {Box,Stack,Flex} from '@chakra-ui/react'
import { fetsh_all_events,deleteevent } from '../../services/admin.js'
import {
  Box,Button,
  Avatar,
  Flex,
  Stack,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Icon
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function EventElement({eventid,titre,dateDebut,dateFin , setEvents}) {
  const token= localStorage.getItem('token')
  const handleDelete = async ()=>{
    try {
      const res = await deleteevent(token,eventid)
      switch (res.data.success) {
        case true:
          setEvents(res.data.all)
          break;
        case false:
          alert('some thing is wrong')
          break;

      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <Flex>
              <Stat border="thin" width={250} borderWidth="1px">
                <StatLabel>{titre}</StatLabel>
                <StatHelpText>
                  {dateDebut}-{dateFin}
                </StatHelpText>
                <Box alignSelf="end">
                  <Button marginRight={2} leftIcon={<DeleteIcon/>} colorScheme='purple' variant='solid'>
                    Modify
                  </Button>
                  <Button marginLeft={2} leftIcon={<DeleteIcon/> }colorScheme='purple' variant='solid' onClick={handleDelete}>
                    Delete
                  </Button>
                  {/* <Icon marginRight={1} as={DeleteIcon} /> */}
                  {/* <Icon as={DeleteIcon} /> */}
                </Box>
              </Stat>

            </Flex>
  )
}
