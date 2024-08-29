import axios from 'axios'
import {BASEURL} from '../constant.js'


export const getGround = (setGroundData, email) => {
    axios.get(`http://localhost:3100/ground/getGroundDetail?email=${email}`)
    .then(response=>{
        if(response?.data){
            console.log("No enteries present")
        }
        // console.log('------9',response.data[0].photo)
        setGroundData(response.data)
    })
}