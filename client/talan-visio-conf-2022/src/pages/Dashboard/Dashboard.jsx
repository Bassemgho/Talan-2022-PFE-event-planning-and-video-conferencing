import React from "react"
import { Navigate, useLocation } from "react-router"
import {Routes,Route} from 'react-router-dom'
import ProtectedRoute from "../../components/ProtectedRoute.js"
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';
import Sidebar from "./Components/SideBar.js";

import CalendarPanel from '../../components/CalendarPanel/CalendarPanel'
import EventsPanel from '../../components/EventsPanel/EventsPanel'
import NotificationsPanel from '../../components/NotificationsPanel'
import SettingsPanel from '../../components/SettingsPanel/SettingsPanel'
import FilesPanel from '../../components/FilesPanel'
import UsersPanel from "../../components/UsersPanel/UsersPanel.jsx";


const Dashboard = ({ setAuth,isAuth,isAdmin, ...rest }) => {

    const location = useLocation()

    const UserLinkItems = [
        { name: 'Home', icon: FiHome, path: "/",component:<CalendarPanel/> },
        { name: 'Events', icon: FiTrendingUp, path: "/events" ,component:<EventsPanel />},
        { name: 'Notifications', icon: FiCompass, path: "/notifications",component: <NotificationsPanel/> },
        { name: 'Files', icon: FiStar, path: "/files" ,component: <FilesPanel/>},
        { name: 'Settings', icon: FiSettings, path: "/settings",component:<SettingsPanel/> },
    ];
    const AdminLinkItems = [
        { name: 'Users', icon: FiHome, path: "/", component : <UsersPanel /> },
        { name: 'Events', icon: FiTrendingUp, path: "/events" ,component:<EventsPanel />},
        { name: 'Notifications', icon: FiCompass, path: "/notifications" ,component: <NotificationsPanel/>  },
        { name: 'Files', icon: FiStar, path: "/files" ,component: <FilesPanel/> },
        { name: 'Settings', icon: FiSettings, path: "/settings" ,component:<SettingsPanel/>},
    ];
    let LinkItems;
    if (isAdmin) {
        LinkItems = AdminLinkItems
    } else {
        LinkItems = UserLinkItems
    }

    return (
        <>
            <Routes>
                {LinkItems.map((link,index) => { 
                    return <Route key={index} path={link.path} element={<ProtectedRoute isAuth={isAuth}><Sidebar setAuth={setAuth} LinkItems={LinkItems}>{link.component}</Sidebar></ProtectedRoute>} />

                 })}
                <Route path='/signin' element={<Navigate to="/"/>}/>

                {/* <Route path='/' element={<ProtectedRoute isAuth={isAuth}><Sidebar LinkItems={LinkItems}><CalendarPanel /></Sidebar></ProtectedRoute>} />
                <Route path='/events' element={<ProtectedRoute isAuth={isAuth}><Sidebar LinkItems={LinkItems}><EventsPanel /></Sidebar></ProtectedRoute>} />
                <Route path='/notifications' element={<ProtectedRoute isAuth={isAuth}><Sidebar LinkItems={LinkItems}><NotificationsPanel /></Sidebar></ProtectedRoute>} />
                <Route path='/files' element={<ProtectedRoute isAuth={isAuth}><Sidebar LinkItems={LinkItems}><FilesPanel /></Sidebar></ProtectedRoute>} />
                <Route path='/settings' element={<ProtectedRoute isAuth={isAuth}><Sidebar LinkItems={LinkItems}><SettingsPanel /></Sidebar></ProtectedRoute>} /> */}


            </Routes>
            
        </>
    )
}
export default Dashboard