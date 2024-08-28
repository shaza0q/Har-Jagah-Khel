import React, {useState} from 'react'
import '../App.css'
import Axios from 'axios'
import {Link, useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const {token} = useParams()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:3100/auth/reset-password/'+token, 
        {password}
        ).then(response => {
            if(response.data.status){
                navigate('/login')
            }
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit}>
                <h1>Reset Password</h1>
                
                <label htmlFor="password">Password: </label>
                <input type='password' placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>
                  
                <button type='submit'>Reset</button>

            </form>    
        </div>
    )
}

export default ResetPassword