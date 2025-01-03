const express=require('express')
const {registerUser,loginUser,googleLogin, updateUser }=require('../controllers/authController')
const router=express.Router()

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/google-login', googleLogin);
router.post('/update-user/:id', updateUser);



module.exports=router;