import axios from "axios";
import {BASEURL} from '../constant.js'


export const fetchTimeSlot = (groundId) => {
    try{
        axios.get(`${BASEURL}/time/getTimeSlot?groundId=${groundId}`)
        .then(response => {
            console.log('-----7',response.data)
            return response
        })
    }
    catch(err) {
        console.log('------12',err)
    }
}