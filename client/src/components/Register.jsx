import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = (props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        fullName:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    // !SubmitHandler

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', user, {withCredentials:true})
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
            <h2>Register</h2>
        <form className="register-form" onSubmit={submitHandler}>
            <label htmlFor="fullName">Full Name</label>
            <input value={user.fullName} name="fullName" onChange={changeHandler} id="fullname" placeholder="Full Name" />
            <label htmlFor="email">Email</label>
            <input value={user.email} onChange={changeHandler}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={user.password} onChange={changeHandler} type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="confirmPassword"> Confirm Password</label>
            <input value={user.confirmPassword} onChange={changeHandler} type="password" placeholder="********" id="confirmPassword" name="confirmPassword" />
            <Link to = {"/allcrimes"}><button type="submit">Register</button></Link>
        </form>
        < Link to={'/login'} ><button className="link-btn">Already have an account?</button></Link>
        {/* <button className="link-btn" Link to={'/login'}>Already have an account? Login here.</button> */}
    </div>
    )}

    
export default Register;