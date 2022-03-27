import React from 'react'
import { Stack } from '@chakra-ui/react'
import UserListing from './UserListing'
import AddUserModal from './AddUserModal'

export default function UsersPanel() {
    return (
        <Stack>
            <AddUserModal />
            <UserListing />

        </Stack>
    )
}
