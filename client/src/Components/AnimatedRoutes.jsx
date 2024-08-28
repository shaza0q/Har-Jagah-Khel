import {Routes, Route, useLocation} from 'react-router-dom'
import Signup from '../Components/Signup'
import Login from '../Components/Login'
import Home from '../Components/Home'
import ForgotPassword from '../Components/ForgotPassword'
import ResetPassword from '../Components/ResetPassword'
import Dashboard from '../Components/Dashboard'
import CompanyDashboard from '../Components/CompDashboard'
import AddGround from '../Components/AddGround'
import AddTimeSlot from '../Components/AddTimeSlot'
import BookingGround from '../Components/BookingGround'

import {AnimatePresence} from 'framer-motion'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <div>
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path = "/login" element={<Login/>}/>
                <Route path="/forgotPassword" element={<ForgotPassword/>}/>
                <Route path="/resetPassword/:token" element={<ResetPassword/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/compDashboard" element={<CompanyDashboard/>}/>
                <Route path="/addGround" element={<AddGround/>}/>
                <Route path="/addTimeSlot" element={<AddTimeSlot/>}/>
                <Route path="/bookingGround" element={<BookingGround/>}/>
            </Routes>
        </AnimatePresence>
    </div>
  )
}

export default AnimatedRoutes