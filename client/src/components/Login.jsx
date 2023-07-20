import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState({
        email:'',
        password:''
    })

    const changeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]:e.target.value})
    }

    const loginHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', userLogin, {withCredentials:true})
            .then((res) => {
                console.log(res);
                navigate('/allcrimes')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={loginHandler}>
                <label htmlFor="email">email</label>
                <input value={userLogin.email} onChange={changeHandler}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                {/* {errors?.email && <span>{errors.email.message}</span> } */}
                <label htmlFor="password">password</label>
                <input value={userLogin.password} onChange={changeHandler} type="password" placeholder="********" id="password" name="password" />
                {/* {errors?.password && <span>{errors.password.message}</span> } */}
                <button type="submit">Log In</button> 
            </form>
            < Link to={'/'} ><button className="link-btn">Don't have an account? Register here.</button></Link>
            {/* <button className="link-btn" Link to={'/'} >Don't have an account? Register here.</button> */}
        </div>
    )
}

export default Login;