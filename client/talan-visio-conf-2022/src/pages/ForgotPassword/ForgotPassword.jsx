import React, { useState } from 'react'
import { Box, FormControl, Stack, FormLabel, Input, Button, Alert, AlertIcon, Flex,Text,Heading  } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { forgotpassword } from '../../services/user';
import './ForgotPassword.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [load, setLoad] = useState(false)
  const [success, setSuccess] = useState(false)
  const [err, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)
    try {
      console.log(email)
      const res = await forgotpassword(email)
      switch (res.data.success) {
        case true:
          setSuccess(true)
          
          break;
        case false:
          setError(true)

          break;
        default:
          setError(true)
          console.log("error")
      }
      setLoad(false)

    } catch (error) {
      console.log(error)
    }

  }
  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  const property = {
    src: "../../assets/loginim.png",
    marginstart: "50px",
    backgroundcolor: "white",
    width: "500px"
  }
  return (
    <Box
      className='box'
      height="550px"
      width="1100px" marginStart={property.marginstart}
      marginTop={property.marginstart}
      borderWidth='thin'
      borderRadius='md'
      overflow='hidden'
      bg="white"
      
    >
      <style>{'body{background-color:rgb(130, 61, 199);}'}</style>
      <Flex
      margin={10}
      >
        <Alert hidden={!err} status='error'>
          <AlertIcon />
          There was an error processing your request
        </Alert>

        <Alert hidden={!success} status='success'>
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>
        
        <FormControl alignContent='center' onSubmit={handleSubmit}>
          <Stack alignItems="center" spacing={5}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input id='email' type='email' width="50%" size='md' onChange={handleChange} />
            <Button type='submit' alignSelf='center' width={80} onClick={handleSubmit} isLoading={load} >Reset password</Button>
            <Button width={80} alignSelf='center' > <Link to='/signin'>Go Back</Link> </Button>
          </Stack>


        </FormControl>
        
      </Flex>

    </Box>
  )
}
