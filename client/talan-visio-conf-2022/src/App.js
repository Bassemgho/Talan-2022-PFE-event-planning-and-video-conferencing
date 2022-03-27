import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation , } from "react-router-dom";
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import logo from './logo.svg';
import Sidebar from './pages/Dashboard/Components/SideBar';
import Dashboard from './pages/Dashboard/Dashboard';
import Signin from './pages/Signin/Signin';
// import Dashboard from './pages/Dashboard/Dashboard';

import CalendarPanel from './components/CalendarPanel/CalendarPanel'
import EventsPanel from './components/EventsPanel'
import NotificationsPanel from './components/NotificationsPanel'
// import SettingsPanel from './components/SettingsPanel'
import FilesPanel from './components/FilesPanel'
import jsCookies from 'js-cookies';



// import {Switch} from 'react-router'

function App() {
  
  const [isAuth, setAuth] = useState(false)
  // useEffect(() => {
  //   <Navigate to="/home"/> 
  //  },[])
  useEffect(() => { 
    let auth
    try {
       auth = localStorage.getItem("auth")
      if(auth){
        setAuth(true)
      }
    } catch (error) {
      console.log(error.message)
    }
    console.log(auth)
   },[])
if(isAuth){
  return (
    <div className="App">
      <Router>
      <Dashboard setAuth={setAuth} isAuth={isAuth} isAdmin={false}/>
        {/* <Routes>
          <Route path='/Signin' element={<Signin setAuth={setAuth}/>}/>
      
          <Route to = '/' element={<Dashboard setAuth={setAuth} isAuth={isAuth} isAdmin={false}/>}/>}/>
        </Routes> */}        
      </Router>
    </div>
  )
}
return(
  <Router>
    <Routes>
      <Route path='/' element={<Navigate to="/signin"/>}/>
      <Route path='/signin' element={<Signin setAuth={setAuth} />} />
    </Routes>
  </Router>
)
}
 


export default App;
