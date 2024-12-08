//making http request

import axios from 'axios'

const API_URL='http://localhost:8080/api/users'

//register user
const register=async(userData)=>{
    const res=await axios.post(API_URL+'/register',userData)

    if(res.data){
        localStorage.setItem('user',JSON.stringify(res.data))
    }
    return res.data
}

//login user
const login=async(userData)=>{
    const res=await axios.post(API_URL+'/login',userData)

    if(res.data){
        localStorage.setItem('user',JSON.stringify(res.data))
    }
    return res.data
}
const logout=async()=>{
    localStorage.removeItem('user')
}
const authService={
    register,
    logout,
    login
}

export default authService