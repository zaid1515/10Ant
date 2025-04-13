const express = require('express');
const { getAllUsers, getUser, updateUser } = require('../controllers/user');
const upload = require('../utils/fileStorage');
const userRouter=express.Router();

userRouter.route('/').get(getAllUsers)
userRouter.route('/:id').get(getUser).patch(upload.single('profilePic'), updateUser)
module.exports=userRouter
