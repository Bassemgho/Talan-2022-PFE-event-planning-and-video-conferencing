import {Route, Navigate} from 'react-router-dom'
const ProtectedRoute = ({isAuth,children,...rest}) => {
    // const isAuth = props.isAuth
   if(!isAuth){
       return(
           
        <Navigate to='/Signin'/>
       )
   }
   
   return(

       children
   )
}
export default ProtectedRoute;