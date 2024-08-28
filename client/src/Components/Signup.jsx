import React, { useState } from 'react'
import '../styling/login.css'
import Axios from 'axios'
import {Link, useNavigate} from "react-router-dom"



const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:3100/auth/signup', 
        {username, email, password, type, address, pincode, city, state}
        ).then(response => {
            if(response.data.status){
                navigate('/login')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const handleTypeChange = (e) => {
        console.log(typeof(e.target.value))
        setType(e.target.value)
    }

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit}>
                <h1>Signup</h1>
            
                <input type='text' placeholder='Enter Name' onChange={(e) => setUsername(e.target.value)}/>

                <input type='email' placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>

                <input type='password' placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>

                <div className='radio-bt'>
                    <p id='radio-sub-bt'>
                    <label for="customer">Customer</label>
                    <input type="radio" id="customer" name="user_type" value="Customer" onChange={handleTypeChange}/>
                    </p>
                    <p  id='radio-sub-bt'>
                    <label for="company">Company</label>
                    <input type="radio" id="company" name="user_type" value="Company" onChange={handleTypeChange}/>
                    </p>
                </div>

                <input type='text' placeholder="Enter address" onChange={(e) => setAddress(e.target.value)}/>

                <input type='number' placeholder='Enter Pincode' onChange={(e) => setPincode(e.target.value)}/>

                <input type='text' placeholder='Entter City' onChange={(e) => setCity(e.target.value)}/>

                <input type='text' placeholder='Entter State' onChange={(e) => setState(e.target.value)}/>

                <button className='signIn-bt signUp' type='submit'>Sign Up</button>
                <p id='for-sign-up'>Already Registered? <Link className='Link' to="/login">Login</Link></p>

            </form>    
        </div>
    )
}

export default Signup;