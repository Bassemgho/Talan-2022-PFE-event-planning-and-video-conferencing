import React, { useState ,useEffect} from 'react'
import { FormControl, Input, Button, Stack, Box, FormLabel, Tag, TagLabel } from '@chakra-ui/react'

export default function ChangePasswordPanel() {

    const [newpassword, setnewpassword] = useState('')
    const [oldpassword, setOldPassword] = useState('')

    const [confirmnewpassword, setConfirmnewPassword] = useState('')

    const [confirm, setConfirm] = useState(false);
    const [hidden,sethidden] = useState(true)
    const handleChange = (e) => {
        switch (e.target.id) {
            case 'oldpassword':
                setOldPassword(e.target.value)
                break;
            case 'newpassword':
                setnewpassword(e.target.value)
                break;
            case 'confirmnewpassword':
                setConfirmnewPassword(e.target.value)
                console.log(e.target.value)

                break;
        }
        console.log(e.target.id)
        // if(  newpassword==confirmnewpassword){
        //     setConfirm(true)
        // }else{
        //     setConfirm(false)
        // }
    }
    useEffect(() => { 
        if(oldpassword &&confirmnewpassword && newpassword == confirmnewpassword){
            sethidden(true)
            setConfirm(true)

            // alert("neww")
        }else{
            sethidden(false)
            setConfirm(false)


        }
     },[confirmnewpassword,oldpassword])
    return (
        <FormControl>
            <Stack>

                <FormLabel htmlFor='oldpassword' >Old password</FormLabel>
                <Input id="oldpassword" onChange={handleChange} />
                <FormLabel htmlFor='newpassword'>New password</FormLabel>
                <Input id='newpassword' onChange={handleChange} />
                <FormLabel htmlFor='confirmnewpassword'>Confirm new password</FormLabel>
                <Input id='confirmnewpassword' onChange={handleChange} />
                
                <Tag
                    size='md'
                    borderRadius='full'
                    variant='solid'
                    colorScheme='red'
                    hidden={hidden}
                >
                    <TagLabel>your passwords are not equal </TagLabel>
                    
                </Tag>
                <Button disabled={!confirm}> confirm </Button>



            </Stack>
        </FormControl>
    )
}
