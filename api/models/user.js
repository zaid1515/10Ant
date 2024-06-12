const mongoose=require('mongoose')

const user=new mongoose.Schema({
     username:{
          type:String,
          required:[true,`Name is required`]
     },
     email:{
          type:String,
          required:[true,`Username is required`]
     },
     password:{
          type:String,
          required:[true,`Password is required`],
          select:false
     },
     contact:{
          type:Number
     },
     bio:{
          type:String
     },
     profilePic:{
          type:String
     }
})

module.exports=mongoose.model('User',user)