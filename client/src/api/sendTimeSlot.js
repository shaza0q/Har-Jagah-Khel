import axios from "axios";
import {BASEURL} from '../constant.js'


export const SendTimeSlot = (timeData, navigate) => {
    console.log({timeData})
    axios.post('http://localhost:3100/time/addTimeSlot', timeData)
    .then(response => {
        console.log(response)
        navigate('/compDashboard')
        
    })
    
}