import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const [userData, setUser] = useState({})

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


  return (
    <div>
      <h1>Welcome to dashboard</h1>
      <h2>Hello {userData && userData.username} </h2>
    </div>    
  )
}

export default Dashboard
