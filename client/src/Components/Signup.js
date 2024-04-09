import React, { useState } from 'react'
import '../App.css'
import Axios from 'axios'
import {Link, useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "../compo/MDBox";
import MDTypography from "../compo/MDTypography";
import MDInput from "../compo/MDInput";
import MDButton from "../compo/MDButton";

// Authentication layout components
import CoverLayout from "../compo1/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

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
        <div className='sign-up-container'>
            <h2>Signup</h2>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <label htmlFor='username'>Username: </label>
                <input type='text' placeholder='Enter Name' onChange={(e) => setUsername(e.target.value)}/>

                <label htmlFor='email'>Email: </label>
                <input type='email' placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password: </label>
                <input type='password' placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>

                <label htmlFor="type">User Type: </label>
                <input type="radio" id="customer" name="user_type" value="Customer" onChange={handleTypeChange}/>
                <label for="customer">Customer</label>
                <input type="radio" id="company" name="user_type" value="Company" onChange={handleTypeChange}/>
                <label for="company">Company</label>

                <label htmlFor='address'>Address: </label>
                <input type='text' placeholder="Enter address" onChange={(e) => setAddress(e.target.value)}/>

                <label htmlFor='pincode'>PinCode: </label>
                <input type='number' placeholder='Enter Pincode' onChange={(e) => setPincode(e.target.value)}/>

                <label htmlFor='city'>City: </label>
                <input type='text' placeholder='Entter City' onChange={(e) => setCity(e.target.value)}/>

                <label htmlFor='State'>City: </label>
                <input type='text' placeholder='Entter State' onChange={(e) => setState(e.target.value)}/>

                <button type='submit'>Sign Up</button>
                <p>Already Registered? <Link to="/login">Login</Link></p>

            </form>    
        </div>
    )
}

export default Signup;