const mongoose=require('mongoose')

const room=new mongoose.Schema({
     owner_pkey:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
     },
     title:{
          type:String,
          required:[true,`Title is required`]
     },
     address:{
          type:String,
          required:[true,`Address required`]
     },
     city:{
          type:String,
          required:[true,`City required`]
     },
     state:{
          type:String,
          required:[true,`State required`]
     },
     zipcode:{
          type:Number,
          required:[true,`Pincode required`]
     },
     description:{
          type:String,
     },
     price:{
          type:Number,
          required:[true,`Price required`]
     },
     deposit:{
          type:Number,
          required:[true,`Deposit required`]
     },
     bhk:{
          type:String,
          required:[true,`BHK required`]
     },
     sqft:{
          type:Number,
     },
     tenants:{
          type:Number,
          required:[true, 'Tenants are required']
     },
     gender:{
          type:String,
     },
     room_type:{
          type:String,
     },
     images:[String]
},{timestamps:true})

module.exports=mongoose.model('Room',room)