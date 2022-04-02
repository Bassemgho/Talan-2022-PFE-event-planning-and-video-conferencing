import React, { useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button, FormControl, Input, Stack, Flex, FormLabel
} from '@chakra-ui/react'
import { adduser } from '../../services/user';
import {fetsh_all} from "../../services/admin"


export default function ({users,setusers}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const token = localStorage.getItem('token')

    const { isOpen, onOpen, onClose } = useDisclosure();
    const refreshUsers = async () => {
        try {
          const all = await fetsh_all(token)
        setusers(all.data.users)
        } catch (error) {
          console.log(error.message)
        }
        
      }
    const handleChange = (e) => {
        switch (e.target.id) {
            case "password":
                setPassword(e.target.value)
                break;
            case "email":
                setEmail(e.target.value)
                break;
            case "firstname":
                setFirstname(e.target.value)
                break;
            case "lastname":
                setLastname(e.target.value)
                break;



        }
    }
    const handleClick = async (e) => {

        try {
            await adduser(token,email, password,firstname,lastname)
            alert("operation successful")
        } catch (error) {
            console.log(error.message)
        }
        refreshUsers()
        onClose();

    }

    return (
        <>
            <Button bg='purple.300' onClick={onOpen}>Add User</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
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
                                <FormLabel htmlFor='firstname'>first name</FormLabel>
                                <Input id="firstname" type="text" placeholder='input firstname' onChange={handleChange} />
                                <FormLabel htmlFor='lastname'>last name</FormLabel>
                                <Input id="lastname" type="text" placeholder='input last name' onChange={handleChange} />

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
