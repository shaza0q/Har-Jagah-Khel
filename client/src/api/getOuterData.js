import axios from "axios"
import {BASEURL} from '../constant.js'


export const getOuterData = (slot_id) => {
  
  return axios.get(`http://localhost:3100/book/getOuterData?slot_id=${slot_id}`)
  .then(res => {
    // console.log(res.data)
    return res.data
  })
  .catch((err => {
    console.log(err)
    throw err
  }))
}
