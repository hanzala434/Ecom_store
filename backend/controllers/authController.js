const User=require('../models/User')
const {hashPassword,comparePassword}=require('../helper/authHelper')
const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');

const registerUser= asyncHandler(async (req,res)=>{
        const {name,email,password,address,phone,role}=req.body
    
        if(!name || !email || !password ||!address||!phone){
            res.status(400)
            throw new Error('Please add all fields')
        }
    
        //check if user exist
        const userExist=await User.findOne({email})
    
        if(userExist){
            res.status(400)
            throw new Error('User already exist')
        }

        //register new user
        const hashedPassword=await hashPassword(password)
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            address,
            phone,
            role
        })
    
        if(user){
            res.status(201).json(
            {_id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id),
            phone:user.phone,
            role:user.role,
            password:user.password
        })
        }else{
            res.status(400)
                throw new Error('Invalid user data')
            
        }
    
})

const loginUser=asyncHandler(async (req,res)=>{

    const {email,password,role}=req.body
    const user=await User.findOne({email})

    if(user &&(await comparePassword(password,user.password))){
        res.status(201).json(
            {_id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user.id,role),
            phone:user.phone,
            password:user.password
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }


})

//jwt token generation
const generateToken=(id,role)=>{
    return jwt.sign({id,role},process.env.JWT_SECRET,
        {expiresIn:'30d'})
    
}   

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const googleLogin = asyncHandler(async (req, res) => {
    const { googleToken } = req.body;
    console.log('Google Token:', googleToken);

  
    if (!googleToken) {
      res.status(400);
      throw new Error('Google token is required');
    }
  
    try {
     
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
      const { email, name } = payload;
  
     
      let user = await User.findOne({ email });
  
      if (!user) {
        const hashedPassword = await hashPassword(email + process.env.JWT_SECRET); 
        user = await User.create({
          name,
          email,
          password:hashedPassword,
          address:'',
          phone:''
        });
      }
  
      const token = generateToken(user.id, user.role);
  
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token,
        password:user.password
      });
    } catch (error) {
      res.status(401);
      throw new Error('Invalid Google token');
    }
  });

  const updateUser = asyncHandler(async (req, res) => {
    const { name, email, password, address, phone } = req.body;
  
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
  
    if (password) {
      user.password = await hashPassword(password);
    }
  
    user.name = name || user.name;
    user.email = email || user.email;
    user.address = address || user.address;
    user.phone = phone || user.phone;
  
    const updatedUser = await user.save();
  
    res.status(200).json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      phone: updatedUser.phone,
      role: updatedUser.role,
    });
  });

module.exports={
    registerUser,
    loginUser,
    googleLogin,
    updateUser

}