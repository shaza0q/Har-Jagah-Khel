import React, {useState} from 'react'
import '../App.css'
import Axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'

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
        <div className='sign-up-container'>
            <h2>Forgot Password</h2>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                
                <label htmlFor='email'>Email: </label>
                <input type='email' placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
    
                <button type='submit'>Send</button>
                <p>Already Registered? <Link to="/login">Login</Link></p>

            </form>    
        </div>
    )
}

export default ForgotPassword