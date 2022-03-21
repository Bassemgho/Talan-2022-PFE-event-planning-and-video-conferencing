import React,{useState,useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import Signin from './pages/Signin/Signin';
import Sidebar from './pages/Dashboard/Components/SideBar';
import Dashboard from './pages/Dashboard/Dashboard'
import {BrowserRouter as Router,Routes,Route,useLocation,Navigate} from "react-router-dom"
import ProtectedRoute from './components/ProtectedRoute';
// import {Switch} from 'react-router'

function App() {
  const [isAuth,setAuth] = useState(false)
  useEffect(() => {
    <Navigate to="/home"/> 
   },[])
  if(isAuth){
    
    return(
      <div className="App">
      <Router>  
          
      <Routes>
        <Route path='/home' element={<ProtectedRoute isAuth={isAuth}><Sidebar><Dashboard/></Sidebar></ProtectedRoute>} />
        <Route path='/trending' element={<ProtectedRoute isAuth={isAuth}><Sidebar><Dashboard/></Sidebar></ProtectedRoute>}  />
        <Route path='/explore' element={<ProtectedRoute isAuth={isAuth}><Sidebar><Dashboard/></Sidebar></ProtectedRoute>}  />
        <Route path='/favori'element={<ProtectedRoute isAuth={isAuth}><Sidebar><Dashboard/></Sidebar></ProtectedRoute>}  />
        <Route path='/setting' element={<ProtectedRoute isAuth={isAuth}><Sidebar><Dashboard/></Sidebar></ProtectedRoute>}  />
        

      </Routes>
    </Router>
    </div>
    )
  }
  return (
    
     
      
   <Signin setAuth = {setAuth}/> 
    
  );
}

export default App;
