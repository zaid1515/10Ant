const mongoose = require('mongoose');

const connectDB=async(url)=>{
     return mongoose.connect(url).then(()=>{
          console.log(`Connected to Database`);
     }).catch((error)=>{
          console.log(error.message)
     })
}

module.exports=connectDB