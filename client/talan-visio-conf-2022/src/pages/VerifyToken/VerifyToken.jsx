import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Spinner,Box, FormControl, Stack, FormLabel, Input, Button } from '@chakra-ui/react'
import { Navigate } from 'react-router'
import { resetpassword } from '../../services/user'
export default function VerifyToken() {
    const {token}  = useParams()
    const [error,seterror] = useState(false)
    const [success,setsuccess ] = useState(false)
   
    useEffect(() => { 
        const sendToken = async (token) => {
            try {
                const res = await resetpassword(token)
                console.log(res)
                switch(res.data.success){
                    case true:
                        setsuccess(true)
                        break;
                    case false:
                        seterror(true);
                        break;
                        
                }
            } catch (error) { 
                seterror(true)
            }
        }
        sendToken(token);
     })
  return (
    <Box>
        {error?<ErrorView/>:undefined}
        {success?<SuccessView/>:undefined}

    </Box>
  )
}
const ErrorView = () => {
    return(
        <Box>
            sorry there was something wrong with your request
        </Box>
    )
}
const SuccessView = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    
    return (
        <Box>
            <FormControl onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <FormLabel htmlFor='pass'>new password</FormLabel>
                    <Input id='pass'/>
                    <FormLabel htmlFor='cpass'>Confirm password</FormLabel>
                    <Input id='cpass'/>
                    <Button onClick={handleSubmit} > Confirm </Button>
                </Stack>
            </FormControl>
        </Box>
    )
}