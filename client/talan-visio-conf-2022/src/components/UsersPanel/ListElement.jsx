import React from 'react'
import { Box,Text,Avatar,Flex } from '@chakra-ui/react'
export default function ListElement({name,job,...rest}) {
  return (
    <>
    <Flex bg="white" width={80} borderRadius={3} padding={3} borderWidth={1}>
        <Avatar/>
        <Box ml={3}>
            <Text id='name' fontWeight="bold">{name}</Text>
            <Text id='job' fontSize='sm'>{job}</Text>

        </Box>
    </Flex>
    </>
  )
}
