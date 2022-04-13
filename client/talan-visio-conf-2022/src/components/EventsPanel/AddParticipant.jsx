import React, { useState, useEffect } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button, FormControl, Input, Stack, Flex, Icon, FormLabel
} from '@chakra-ui/react'
import { Select, CreatableSelect } from 'chakra-react-select'

import AddIcon from '@mui/icons-material/Add';

import { adduser } from '../../services/user';
import { add_event, fetsh_all } from "../../services/admin"


export default function ({usrs,setusrs}) {
    const [email, setEmail] = useState("")

    const [users, setUsers] = useState([])
    const [load, setLoad] = useState(false)

    const token = localStorage.getItem('token')


    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const fetshData = async (token) => {
            try {
                const all = await fetsh_all(token)
                setUsers(all.data.users)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetshData(token);
    }, [])
    const handleChange = (e) => {
        if (e.target.id == 'email') {
            setEmail(e.target.value)
        }
    }
    const handleClick = async (e) => {
        

        onClose();

    }
    // const data =   [{ value: "blue", label: "Blue", color: "#0052CC" },
    // { value: "purple", label: "Purple", color: "#5243AA" },
    // { value: "red", label: "Red", color: "#FF5630" },
    // { value: "orange", label: "Orange", color: "#FF8B00" },
    // { value: "yellow", label: "Yellow", color: "#FFC400" },
    // { value: "green", label: "Green", color: "#36B37E" }]
    const getdata = (params) => {
        const data = []
        let ob
        if (users) {
            console.log(users)
            users.map((v, i) => {
                ob = { value: v.email, label: v.email }
                data.push(ob)
            })
        }

        return data
    }
    const handleChangeSelect = (e) => { 
        const list = []
        e.map((val,ind) => { 
            list.push(val.value)
         })
        setusrs(list)
     }

    return (
        <>
            {/* <Button bg='purple.300' onClick={onOpen}>Add User</Button> */}
            <Icon
                marginLeft="8px"
                as={AddIcon}
                borderRadius="50%"
                border='dashed'
                borderWidth='thin'
                onClick={onOpen}
                width={8}
                height={8}


            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>
                        Add a new Participant
                    </ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <Stack spacing={2}>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                {/* <Input id="email" type="email" placeholder='input email' onChange={handleChange} /> */}
                                {/* <FormLabel htmlFor='password'>Password</FormLabel> */}
                                {/* <Input id="password" type="password" placeholder='input email' onChange={handleChange} /> */}
                                {/* <FormLabel htmlFor='firstname'>first name</FormLabel> */}
                                {/* <Input id="firstname" type="text" placeholder='input firstname' onChange={handleChange} /> */}
                                {/* <FormLabel htmlFor='lastname'>last name</FormLabel> */}
                                {/* <Input id="lastname" type="text" placeholder='input last name' onChange={handleChange} /> */}
                                <Select
                                    isMulti
                                    name="colors"
                                    options={getdata()}
                                    placeholder="select participants"
                                    closeMenuOnSelect={false}
                                    size="sm"
                                    onChange={handleChangeSelect}
                                />
                            </Stack>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button isLoading={load} onClick={handleClick}>Add user</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
