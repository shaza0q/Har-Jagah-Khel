import React, {useState} from 'react'
import '../App.css'
import Axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'
import SocialMedia from './SocialMedia'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:3100/auth/forgot-password', 
        {email}
        ).then(response => {
            if(response.data.status){
                alert("Check your email for link")
                navigate('/login')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit}>
                <h2>Forgot Password</h2>
                <SocialMedia/>
                <input type='email' placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
    
                <button className='signIn-bt' type='submit'>Send</button>
                <p id='for-sign-up'>Already Registered? <Link className='Link' to="/login">Login</Link></p>

            </form>    
        </div>
    )
}

export default ForgotPassword