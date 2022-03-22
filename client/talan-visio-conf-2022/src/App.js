import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import logo from './logo.svg';
import Sidebar from './pages/Dashboard/Components/SideBar';
import Dashboard from './pages/Dashboard/Dashboard';
import Signin from './pages/Signin/Signin';

import CalendarPanel from './components/CalendarPanel'
import EventsPanel from './components/EventsPanel'
import NotificationsPanel from './components/NotificationsPanel'
import SettingsPanel from './components/SettingsPanel'



// import {Switch} from 'react-router'

function App() {
  const [isAuth, setAuth] = useState(false)
  // useEffect(() => {
  //   <Navigate to="/home"/> 
  //  },[])
  if (isAuth) {

    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path='/home' element={<ProtectedRoute isAuth={isAuth}><Sidebar><CalendarPanel /></Sidebar></ProtectedRoute>} />
            <Route path='/trending' element={<ProtectedRoute isAuth={isAuth}><Sidebar><EventsPanel /></Sidebar></ProtectedRoute>} />
            <Route path='/explore' element={<ProtectedRoute isAuth={isAuth}><Sidebar><NotificationsPanel /></Sidebar></ProtectedRoute>} />
            <Route path='/favori' element={<ProtectedRoute isAuth={isAuth}><Sidebar><FilesPanel /></Sidebar></ProtectedRoute>} />
            <Route path='/settings' element={<ProtectedRoute isAuth={isAuth}><Sidebar><SettingsPanel /></Sidebar></ProtectedRoute>} />


          </Routes>
        </Router>
      </div>
    )
  }
  return (



    <Signin setAuth={setAuth} />

  );
}

export default App;
