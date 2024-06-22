const express = require('express');
const { login, register, googleLogin } = require('../controllers/user');
const authRouter=express.Router();
const passport=require('passport')

authRouter.route('/register').post(register)
authRouter.route('/login').post(login)
authRouter.get('/google',passport.authenticate('google',{scope:['email','profile']}))
authRouter.get('/google/callback', passport.authenticate('google',{session:false, failureRedirect:'/login'}),googleLogin)

module.exports=authRouter