import axios from "axios";


export const SendTimeSlot = (timeData, navigate) => {
    console.log({timeData})
    axios.post('http://localhost:3100/time/addTimeSlot', timeData)
    .then(response => {
        console.log(response)
        navigate('/compDashboard')
        
    })
    
}