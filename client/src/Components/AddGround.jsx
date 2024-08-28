import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../styling/AddGroundStyle.css'
import { getData } from '../api/userData'
import {cloudinaryUpload} from '../api/cloudinary'


const AddGround = () => {
    const [gname, setgname] = useState('')
    const [gtype, setgtype] = useState('')
    const [gdisc, setgdisc] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [photo, setPhoto] = useState('')
    const [userData, setUser] = useState(null)

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3100/auth/verify')
        .then(res=>{
          console.log("-----14-",res.data)
            if(res.data.status){
              axios.get('http://localhost:3100/auth/loginData')
              .then(userRes => {
                console.log("------18",res.data)
                setUser(userRes.data.user)
                console.log("---20",userRes.data.user.type)
                
              }).catch(err => {
                console.log('error fetching data: ', err)
              })
            }else{
              console.log('Error fetching user data: ', res.data.error)
            }
        })
        .catch(err => {
          console.log('Eror fethching 1', err)
        })
    },[])

    // getData(setUser)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(userData.email)
        const email = userData.email
        const groundData = {gname, gtype, gdisc, address, pincode, city, state, photo, email: userData?userData.email: ''}

        console.log("-----54",groundData)

        axios.post('http://localhost:3100/ground/addGround', groundData)
        .then(response => {
          console.log('-----56',response)
            if(response.data.status){
                console.log("Ground Added")
            }
        })
        .catch(res => { 
          console.log('----62',res)
          console.log('---63',res.message)
            alert(res?.code  + " :  " + res?.response?.data?.message )
          }
        )
    }


    return(
        <div className='addGroundMain'>
            <h2>Add Grounds</h2>

            <form className='form-addGround' onSubmit={handleSubmit}>
                {/* <label htmlFor="gname">Ground Name:</label> */}
                <input type='text' placeholder='Enter ground name' onChange={(e) => setgname(e.target.value)}/>

                {/* <label htmlFor="gtype">Ground Type:</label> */}
                <input type='text' placeholder='Enter ground type' onChange={(e) => setgtype(e.target.value)}/>

                {/* <label htmlFor="gdisc">Ground Description:</label> */}
                <input type='text' placeholder='Enter Ground Description' onChange={(e) => setgdisc(e.target.value)}/>

                {/* <label htmlFor='address'>Address: </label> */}
                <input type='text' placeholder="Enter address" onChange={(e) => setAddress(e.target.value)}/>

                {/* <label htmlFor='pincode'>PinCode: </label> */}
                <input type='number' placeholder='Enter Pincode' onChange={(e) => setPincode(e.target.value)}/>

                {/* <label htmlFor='city'>City: </label> */}
                <input type='text' placeholder='Entter City' onChange={(e) => setCity(e.target.value)}/>

                {/* <label htmlFor='State'>State: </label> */}
                <input type='text' placeholder='Entter State' onChange={(e) => setState(e.target.value)}/>

                <label htmlFor='gphoto'>Add photos</label>
                <input type='file' onChange={async (e)=>{
               const res =  await cloudinaryUpload(e.target.files[0], setPhoto)}
                }/>

                <button id='logout-bt'type='submit'>Add ground</button>
            </form>
        </div>

        
    )
}

export default AddGround