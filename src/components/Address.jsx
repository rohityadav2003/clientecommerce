import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Address() {
  const navigate=useNavigate();
    const[address,setaddress]=useState({username:"",pincode:"",address:"",city:"",state:""});
    const handlechange=async(e)=>{
        setaddress({...address,[e.target.name]:e.target.value})
    }
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post(`
${process.env.BACKEND_URL}/user/address`,address,{
                headers:{
                    'Content-Type':'application/json',
                },
                withCredentials:true

            })
            if(response.status===200){
              alert(response.data.message)
              navigate('/payment');
            }
        }
        catch(err){
            console.log(err.message)
        }
    }
  return (
    <div className="checkout-address-container">
    <h2>Delivery Address</h2>
    <form className="address-form"onSubmit={handlesubmit}>
      <div className="form-group">
        <label>Full Name</label>
        <input type="text"name="username" onChange={handlechange}value={address.username} placeholder="Enter your full name" />
      </div>

      {/* <div className="form-group">
        <label>Mobile Number</label>
        <input type="text" placeholder="Enter your mobile number" />
      </div> */}

      <div className="form-group">
        <label>Pincode</label>
        <input type="number"name='pincode' onChange={handlechange}value={address.pincode} placeholder="Enter pincode" />
      </div>

      <div className="form-group">
        <label>Address (House No, Building, Street, Area)</label>
        <textarea placeholder="Enter full address"name='address'value={address.address} onChange={handlechange}></textarea>
      </div>

      <div className="form-group">
        <label>City</label>
        <input type="text" name="city" onChange={handlechange}value={address.city}placeholder="Enter city" />
      </div>

      <div className="form-group">
        <label>State</label>
        <input type="text"name='state' onChange={handlechange}value={address.state} placeholder="Enter state" />
      </div>

      {/* <div className="form-group">
        <label>Landmark (Optional)</label>
        <input type="text" placeholder="Near park, mall etc." />
      </div>

      <div className="form-group">
        <label>Alternate Phone (Optional)</label>
        <input type="text" placeholder="Another contact number" />
      </div> */}

      <button type="submit" className="submit-btn">
        Save Address & Continue
      </button>
    </form>
  </div>

  )
}
