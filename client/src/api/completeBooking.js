import axios from 'axios'
import {BASEURL} from '../constant.js'


export const completeBooking = (id) => {
  return axios.post(`${BASEURL}/book/confirmBooking?id=${id}`)
  .then(res => {
    // console.log(res.data)
    window.location.reload();
    return res
  })
}
