import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword'
import Dashboard from './Components/Dashboard'
import CompanyDashboard from './Components/CompDashboard'
import AddGround from './Components/AddGround'
import AddTimeSlot from './Components/AddTimeSlot'
import BookingGround from './Components/BookingGround'
import AnimatedRoutes from './Components/AnimatedRoutes'



export default function App() {
  
  return (
    <>
      <BrowserRouter>
        <AnimatedRoutes/>
      </BrowserRouter>
    </>
  );
}

// export default App;