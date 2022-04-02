import React,{useState,useEffect} from 'react'
import { Stack } from '@chakra-ui/react'
import UserListing from './UserListing'
import AddUserModal from './AddUserModal'

export default function UsersPanel() {
    const [users,setusers] = useState([])

    return (
        <Stack>
            <AddUserModal users={users} setusers={setusers} />
            <UserListing users={users} setusers={setusers}/>

        </Stack>
    )
}
