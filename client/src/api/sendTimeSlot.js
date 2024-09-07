import axios from "axios";
import {BASEURL} from '../constant.js'


export const SendTimeSlot = (timeData, navigate) => {
    console.log({timeData})
    axios.post(`${BASEURL}/time/addTimeSlot`, timeData)
    .then(response => {
        console.log(response)
        navigate('/compDashboard')
        
    })
    
}