import React from 'react'
import Layout from '../components/layout/Layout'
import { useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import "../styles/AuthStyle.css"
import { useSelector,useDispatch } from 'react-redux'
import { register,reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
   const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    address:'',
    phone:''
   })

   const {name,email,password,address,phone}=formData
   const navigate=useNavigate()
   const dispatch=useDispatch()

   const {user,isLoading,isSuccess,isError,message}=useSelector((state)=>state.auth)
   
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess||user){
      navigate('/')
    }

    dispatch(reset())
  },[user,isError,isLoading,isSuccess,message,navigate,dispatch])
   
const onChange=(e)=>{
    setFormData((prevState)=>({
       ...prevState,
       [e.target.name]:e.target.value,
    }))
}

const handleSubmit=async(e)=>{
  e.preventDefault();
  const userData={
    name,
    email,
    password,
    phone,
    address
}
  dispatch(register(userData))
  navigate('/');
  };

  if(isLoading){
    return <Spinner/>
  }

  return (
    <Layout title="Register - Ecommer App">
    <div className="form-container ">
      <form onSubmit={handleSubmit}>
        <h4 className="title">REGISTER FORM</h4>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id='name'
            name='name'
            value={name}
            onChange={onChange}
            placeholder="Enter Your Name"
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name='email'
            value={email}
            onChange={onChange}
            className="form-control"
            id="email"
            placeholder="Enter Your Email "
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name='password'
            value={password}
            onChange={onChange}
            className="form-control"
            id="password"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name='phone'
            value={phone}
            onChange={onChange}
            className="form-control"
            id="phone"
            placeholder="Enter Your Phone"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name='address'
            value={address}
            onChange={onChange}
            className="form-control"
            id="address"
            placeholder="Enter Your Address"
            required
          />
        </div>
        {/* <div className="mb-3">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="What is Your Favorite sports"
            required
          />
        </div> */}
        <button type="submit" className="btn btn-primary">
          REGISTER
        </button>
      </form>
    </div>
  </Layout>
  )
}

export default Register
