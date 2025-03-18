import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StartingScreen from './pages/StartingScreen'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import CaptainSignup2 from './pages/CaptainSignup2'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import VehicleScreen from './pages/VehicleScreen'
import Paymentpage from './pages/Paymentpage'
import RideDetails from './pages/RideDetails'
import PickUpTime from './pages/PickUpTime'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<StartingScreen />}/>
        <Route path='/login' element={<UserLogin />}/>
        <Route path='/signup' element={<UserSignUp />}/>
        <Route path='/captainlogin' element={<CaptainLogin />}/>
        <Route path='/captainsignup' element={<CaptainSignUp/>}/>
        <Route path='/CaptainSignup2' element={<CaptainSignup2/>}/>
        <Route path='/Home' element={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
        }/>
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        }/>
        <Route path='/pickuptime' element={<UserProtectWrapper><PickUpTime /></UserProtectWrapper>}/>
        <Route path='/choosevehicle' element={<UserProtectWrapper><VehicleScreen /></UserProtectWrapper>}/>
        <Route path='/ridedetails' element={<UserProtectWrapper><RideDetails /></UserProtectWrapper>}/>
        <Route path='/paymentpage' element={<UserProtectWrapper><Paymentpage /></UserProtectWrapper>}/>
      </Routes>
    </div>
  )
}

export default App
