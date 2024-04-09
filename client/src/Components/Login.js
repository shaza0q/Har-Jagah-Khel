import React, {useState} from "react";
import '../App.css'
import Axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    Axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3100/auth/login", {
            email, password}
            ).then(response => {
                console.log(response.data)
            if(response.data.status){
                navigate('/')
                console.log(response.data)
            }else{
                console.log(response.data.message)
            }
        }).catch(err => {
            console.log(err)
        })
    };

    return (
        <div className='sign-up-container'>
            <h2>Login</h2>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                
                <label htmlFor='email'>Email: </label>
                <input type='email' placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password: </label>
                <input type='password' placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>
                    
                <button type='submit'>Login</button>
                <Link to="/forgotPassword">Forgot Password?</Link>
                <p>Don't have an account</p><Link to="/signup">Sign Up</Link>

            </form> 
        </div>
    )
}

export default Login;