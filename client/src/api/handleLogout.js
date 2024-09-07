import axios from "axios"
import {BASEURL} from '../constant.js'

export const handleLogout = (navigate) => {
    axios.get(`${BASEURL}/auth/logout`)
    .then(res => {
        if(res.data.status){
            navigate('/login')
        }
    }).catch(err => {
        console.log(err)
    })
}