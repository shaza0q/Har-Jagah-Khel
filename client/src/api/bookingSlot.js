import axios from "axios";
import {BASEURL} from '../constant.js'

export const bookingSlot = (slotId, groundId, userId) => {
    try{
        axios.post(`${BASEURL}/book/addBooking?slotId=${slotId}&groundId=${groundId}&userId=${userId}`)
        .then(response => {
            if(response){console.log('Booking registered')
            window.location.reload();
        }
            else console.log('Booking not done')
        })
    }
    catch(err){
        console.log('--------9', err)
    }
}