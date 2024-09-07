import axios from 'axios'
import {BASEURL} from '../constant.js'

export const bookingData = (setBookingData, compId, groundId) => {
    console.log(groundId + "---4" + compId)

    axios.get(`${BASEURL}/book/getBookingData?groundId=${groundId}&userId=${compId}`)
    .then(response=>{
        console.log(response.data)
        setBookingData(response.data)
    })
    .catch(err => {
        console.log(err)
    })
}
