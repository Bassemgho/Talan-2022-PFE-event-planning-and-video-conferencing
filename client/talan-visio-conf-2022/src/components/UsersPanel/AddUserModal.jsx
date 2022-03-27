import React,{useState} from 'react'
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,FormControl,Input,Stack,Flex,FormLabel
  } from '@chakra-ui/react'
import { adduser } from '../../services/user';

export default function () {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const {isOpen,onOpen,onClose} = useDisclosure();
    const handleChange = (e) => {
        if(e.target.id=="password"){
            setPassword(e.target.value)
        }else{
            setEmail(e.target.value)
        }
    }
    const handleClick = async (e) => {
        
        try {
            await adduser(email,password)
            alert("operation successful")
        } catch (error) {
            console.log(error.message)
        }
        onClose();
        
    }

  return (
    <>
        <Button onClick={onOpen}>Add User</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalCloseButton/>
                <ModalHeader>
                    Add a new user
                </ModalHeader>
                <ModalBody>
                    <FormControl>
                        <Stack spacing={2}>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input id="email" type="email" placeholder='input email' onChange={handleChange} />
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Input id="password" type="password" placeholder='input email' onChange={handleChange} />

                        </Stack>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleClick}>Add user</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  )
}
