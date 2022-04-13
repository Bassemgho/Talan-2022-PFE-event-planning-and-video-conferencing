import React,{useEffect, useState} from "react";
import "./Signin.css"
import img from '../../assets/loginim.png'
import Sidebar from "../Dashboard/Components/SideBar";
import { Box ,Container,Flex, HStack , Heading,Text,Input,Stack,FormControl,FormLabel,Button,Link as Clink} from "@chakra-ui/react";
import { sendcreds } from "../../services/user";
import { Link } from "react-router-dom";
// import { Navigate } from "react-router";
import Cookies from 'js-cookies'
const Signin = ({setAuth,setAdmin}) => {
    useEffect(() => { 
        try {
            const auth = localStorage.getItem("auth")
            setAuth(auth)
            
        } catch (error) {
            console.log(error.message)
        }
     },[])
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const property = {
        src:"../../assets/loginim.png",
        marginstart:"50px",
        backgroundcolor:"white",
        width:"500px"
    }
    
    const handleChange = (e) => {
        if(e.target.id=="password"){
            setPassword(e.target.value)
        }else{
            setEmail(e.target.value)
        }
    }
    //dont forget async
    const  handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data = await sendcreds(email,password)
            console.log(data)
        let token = data.data.token;
        
        if(token){
            setAuth(true)
            localStorage.setItem("token",token)
            localStorage.setItem("auth",true)
        }
        else{
            alert("youre credentials are wrong")
            
            return
        }
        if(data.data.role=="admin"){
            localStorage.setItem("admin",true)

            setAdmin(true)
        }
        
        } catch (error) {
            console.log(error.message)
        }
        
        

    }
    return(
        <Box display="flex"
        height="550px"
        width="1100px" marginStart={property.marginstart}
        marginTop = {property.marginstart} 
        borderRadius='sm' 
        overflow='hidden'
        bg="white"
         >
      <style>{'body{background-color:rgb(130, 61, 199);}'}</style>

             
            <Flex bg="yellow" overflow="hidden">
                <Box className="imagelogin">
                    <img width="360px" src={img} alt="" />
                </Box>
                <Box className="formlogin" bg='white' width={1100-360} >
                {/* <img src={img} alt="" /> */}
                    
                    <Stack 
                        // align="start"
                        marginTop="12%"
                        marginStart="25%"
                        spacing = {10}>
                        <Text bg="white"
                        fontWeight="bold"
                        fontSize="25px"                       
                        >Welcome to Talan</Text>
                        <FormControl alignSelf="start" onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input id="email" type="email" onChange={handleChange} placeholder='type your  email' size='md' width = "400px" />
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input id="password" type="password" onChange={handleChange} placeholder='Type your password' size='md' width="400px"/>
                            </Stack>
                            <Button  marginTop="20px" alignSelf="center" width="150px" borderRadius="10px" colorScheme="purple" onClick={handleSubmit}>Sign in</Button>
                            <Button onClick={ ()=>{setAuth(true);localStorage.setItem("auth",true)} }>Without log</Button>
                        </FormControl>
                        <Clink marginRight={5} size='sm' alignSelf='end' ><Link to='/auth/forgotpassword'> forgot password</Link> </Clink>
                    </Stack>
                </Box>
            </Flex>
        </Box>
    )

}
export default Signin