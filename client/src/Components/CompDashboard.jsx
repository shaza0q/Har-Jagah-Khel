import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../styling/CompDashboardStyle.css'
import { useNavigate } from 'react-router-dom'
import {getGround} from '../api/getGround'
import { gettingData } from '../api/getUserData'
import { handleLogout } from '../api/handleLogout'
import HeaderTab from './HeaderTab'
import AddTimeSlot from './AddTimeSlot'
import Footer from './Footer'


const CompanyDashboard = () => {
  const navigate = useNavigate()
  const [userData, setUser] = useState(undefined)
  const [groundData, setGroundData] = useState([])
  const [visibleSlots, setVisbileSlots] = useState(false)
  const [selectedGroundId, setSelectedGroundId] = useState(null)



  axios.defaults.withCredentials = true;

  console.log("userData",userData)

  useEffect(() => {
      gettingData(setUser)
  },[])

  useEffect(()=>{
    console.log("usee 2")
    if(userData)
      getGround(setGroundData, userData.email) 
  },userData)

  console.log('--------34',groundData)
  
  groundData?.forEach(element => {
    console.log(element.photo)  
  })


  const handleAddGround = () => {
    navigate('/addGround')
  }  

  const handleBooking = (groundId) => {
    console.log(userData._id)
    console.log(groundId)
    navigate(`/bookingGround?groundId=${groundId}&compId=${userData.email}`)
  }

  const addTimeSlots = (groundId) => {
    console.log('--------52', groundId)
    // navigate(`/addTimeSlot?groundId=${groundId}`)
    setSelectedGroundId(groundId)
    setVisbileSlots(true)
  }


  return (
    <div>
      <HeaderTab/>
      <h1>Welcome to Company dashboard</h1>
      <h2>Hello {userData && userData.username} </h2>

      <div className='gCards'>
        <div className='gCard'>
            {groundData && groundData.length &&
            groundData?.map((ground)=>{
              return(
                <div className='groundCard'>
                  <h4>{ground.ground}</h4>
                  <img className="gImage" src={ground.photo}></img>
                  <span>Type: {ground.type}</span><br/>
                  <span>Description: {ground.discription}</span>
                  <div className="ground-bt">
                    <button id='logout-bt' onClick={() => addTimeSlots(ground._id)}>Add slots</button>
                    <button id='logout-bt' onClick={() => handleBooking(ground._id)}>Bookings</button>
                  </div>
                </div>
              )
            })
            }
        </div>
      </div>

      {visibleSlots && (
        <AddTimeSlot
        visible={visibleSlots}
        groundId={selectedGroundId}
        onClose={()=>setVisbileSlots(false)}
        />
      )}


      <div className="grounds">
        <h3>Want to add new Grounds?</h3>
        <button id='logout-bt' onClick={handleAddGround} >Add Ground</button>
      </div>

      {/* <Footer/> */}
    
    </div>    

  )
}

export default CompanyDashboard
