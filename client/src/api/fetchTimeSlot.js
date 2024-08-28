import axios from "axios";

export const fetchTimeSlot = (groundId) => {
    try{
        axios.get(`http://localhost:3100/time/getTimeSlot?groundId=${groundId}`)
        .then(response => {
            console.log('-----7',response.data)
            return response
        })
    }
    catch(err) {
        console.log('------12',err)
    }
}