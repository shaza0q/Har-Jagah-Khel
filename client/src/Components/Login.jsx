import React, {useState} from "react";
import '../styling/login.css'
import Axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import SocialMedia from "./SocialMedia";
import {BASEURL} from '../constant.js'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    Axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert(`You are login with email: ${email} and password: ${password}`);
        Axios.post("http://localhost:3100/auth/login", {
            email, password}
            ).then(response => {
                console.log(response.data)
            if(response.data.type.type === 'Customer'){
                navigate('/dashboard')
                console.log(response.data)
            }else if(response.data.type.type === 'Company'){
                navigate('/compDashboard')
                console.log(response.data)
            }
        }).catch(err => {
            console.log(err)
        })
    };

    return (
        
        <motion.div
            className="form-container sign-in-container"
            
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <form className="login-form"onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                <SocialMedia/>
                <span>or use your account</span>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Link className='Link' to="/forgotPassword">Forgot Password?</Link>
                <p id='for-sign'>Don't have an account? <Link className='Link' to="/signup">Sign Up</Link></p>
                
                <button className='signIn-bt'type='submit'>Sign In</button>
            </form>
        </motion.div>

    )
}

export default Login;