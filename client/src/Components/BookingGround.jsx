import React, {useEffect, useState} from 'react'
import { bookingData } from '../api/bookingData'
import { getOuterData } from '../api/getOuterData'
import { completeBooking } from '../api/completeBooking'
import '../styling/BookingGroundStyle.css'

const BookingGround = () => {

    // const [userData, setUser] = useState()
    const [bookData, setBookingData] =  useState([])
    const [groundId, setGroundId] = useState(null)
    const [userId, setUserId] = useState(null)
    const [outerData, setOuterData] = useState([])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const gId = urlParams.get('groundId')
        const cId = urlParams.get('compId')
        setGroundId(gId)
        setUserId(cId)
    }, [])


    useEffect(() => {
        if(groundId && userId){
            // console.log('----------27', userId + groundId)
            bookingData(setBookingData, userId, groundId)
        }
    }, [groundId, userId])


    useEffect(() => {
        const fetchOuterData = async () => {
            if(bookData.length > 0){
                try{
                    const allOuterData = await Promise.all(bookData.map(async (booking) => {
                        const data = getOuterData(booking.slot_id)
                        return data
                    }))
                    setOuterData(allOuterData)
                }
                catch(err){console.log(err)}
            }
        } 
        fetchOuterData()
    },[bookData])

    // console.log("length of outerData " + outerData.length)
    // useEffect(()=>{
    //     outerData && outerData.length && outerData.map((data) => {
    //         const slotData = data.otherData.slot_id
    //         const userData = data.otherData.user_id

    //         console.log(data.otherData._id)
    //     })

    // }, [outerData])

    const handleConfirmationData = async(id) => {
        
        completeBooking(id)
        .then(res => {
            console.log('----63 ' + res.data)
        })
        .catch(err => {console.log(err)})
        
    }

    // console.log(outerData)

    return(
        <div>
            <h1>Today's bookings</h1>

            <div className='search-tab'></div>

            <div className='bookings'>
            {outerData && outerData.length &&
            outerData.map((data) => {
                const slotData = data.otherData.slot_id
                const userData = data.otherData.user_id

                return(
                    <>
                    
                    <div className="booking-card">
                        <span>{slotData.time_start}-{slotData.time_end}</span><br/>
                        <span>{userData.username}</span><br/>
                        <span>{userData.email}</span><br/>
                        <span>{data.otherData.otp}</span>
                        <button id='confirm-bt-booking'onClick={() => handleConfirmationData(data.otherData._id)}>Confirm</button>
                    </div>
                    </>
                )

            })}
            
            </div>
        </div>

    )
}

export default BookingGround