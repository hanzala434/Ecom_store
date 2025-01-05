//making http request

import axios from 'axios'

const API_URL=`${process.env.REACT_APP_API}/api/users`

//register user
const register=async(userData)=>{
    const res=await axios.post(API_URL+'/register',userData)

    if(res.data){
        localStorage.setItem('user',JSON.stringify(res.data))
    }
    return res.data
}

//update user
const updateUser=async(userData,id)=>{
    const res=await axios.post(`${API_URL}/update-user/${id}`,userData)
    
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

const googleLogin = async (googleToken) => {
    console.log({googleToken});
    const res = await axios.post(API_URL + '/google-login',  {googleToken});
    console.log(res.data)
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res.data;
};


const authService={
    register,
    logout,
    login,
    googleLogin,
    updateUser
}

export default authService