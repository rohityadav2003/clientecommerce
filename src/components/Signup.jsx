import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate=useNavigate();
  const[users,setusers]=useState({name:'',mobile:'',email:'',password:''});
  const handlechange=async(e)=>{
    setusers({...users,[e.target.name]:e.target.value})
  }
const handlesubmit=async(e)=>{
  e.preventDefault();
  try{
 const response=await axios.post(`
${process.env.REACT_APP_BACKEND_URL}/user/signup`,users,{
  headers:{
    'Content-Type': 'application/json',
  },
  
 });
 if(response.status===200){
  alert(response.data.message);
  navigate('/verify-otp');
}
}
catch(err){
 
    alert(err.response?.data?.message || "Something went wrong");
    console.log(err.response?.data || err.message);
  }
  
}

  return (
    <div className="container">
      <div className="card">
        <h2>Create Account</h2>
        <form className="form"onSubmit={handlesubmit}>
          <div className="form-group">
            <label className="label">Your name</label>
            <input
              type="text"
              name="name"
              required
              className="input"
              onChange={handlechange}
              value={users.name}
            />
          </div>

          <div className="form-group">
            <label className="label">Mobile number</label>
            <input
              type="number"
              name="mobile"
              required
              className="input"
              onChange={handlechange}
               value={users.mobile}

            />
          </div>

          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              required
              className="input"
              onChange={handlechange}
              value={users.email}
            />
          </div>

          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              required
              className="input"
              onChange={handlechange}
                  value={users.password}

            />
            <p className="helper-text">Passwords must be at least 6 characters.</p>
          </div>

          <button type="submit" className="button">
            Continue
          </button>

          <p className="terms">
            By creating an account, you agree to Amazon's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
          </p>
        </form>
      </div>
    </div>
  );
}
