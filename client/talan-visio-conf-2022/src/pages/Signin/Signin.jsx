import React,{useState} from "react";
import "./Signin.css"
import img from '../../assets/loginim.png'
import Sidebar from "../Dashboard/Components/SideBar";
import { Box ,Container,Flex, HStack , Heading,Text,Input,Stack,FormControl,FormLabel,Button} from "@chakra-ui/react";
import { sendcreds } from "../../services/user";
const Signin = ({setAuth}) => {
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
        localStorage.setItem("token",token)
        if(token){
            setAuth(true)
        }
        else{
            alert("youre credentials are wrong")
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
                        </FormControl>
                        
                    </Stack>
                </Box>
            </Flex>
        </Box>
    )

}
export default Signin