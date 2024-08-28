import axios from 'axios'

export const bookingData = (setBookingData, compId, groundId) => {
    console.log(groundId + "---4" + compId)

    axios.get(`http://localhost:3100/book/getBookingData?groundId=${groundId}&userId=${compId}`)
    .then(response=>{
        console.log(response.data)
        setBookingData(response.data)
    })
    .catch(err => {
        console.log(err)
    })
}
