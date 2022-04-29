import React,{useState,useEffect} from 'react'
import { Stack ,Box} from '@chakra-ui/react'
import UserListing from './UserListing'
import AddUserModal from './AddUserModal'

export default function UsersPanel() {
    const [users,setusers] = useState([])

    return (
        <Box overflow='scroll'>
            <AddUserModal users={users} setusers={setusers} />
            <UserListing users={users} setusers={setusers}/>

        </Box>
    )
}
