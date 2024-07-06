const express = require('express');
const { login, register, googleLogin, forgotPassword, resetPassword } = require('../controllers/user');
const authRouter=express.Router();
const passport=require('passport')

authRouter.route('/register').post(register)
authRouter.route('/login').post(login)
authRouter.get('/google',passport.authenticate('google',{scope:['email','profile']}))
authRouter.get('/google/callback', passport.authenticate('google',{session:false, failureRedirect:'/login'}),googleLogin)
authRouter.get('/forgot',forgotPassword)
authRouter.post('/reset',resetPassword)

module.exports=authRouter