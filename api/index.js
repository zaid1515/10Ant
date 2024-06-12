console.log(`Welcome to 10ant`);

const express = require('express');
const connectDB = require('./db/connect');
const authRouter = require('./routes/auth.');
const userRouter = require('./routes/user');
const cors = require('cors');
const roomRouter = require('./routes/room');
const app= express()
const path=require('path')
const dotenv=require('dotenv').config()
const port=4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/tmp",express.static('tmp'))

app.get('/',(req,res)=>{
     res.send("Welcome to 10Ant")
})

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/room',roomRouter)

app.get('*',(req,res)=>{
     res.status(404).json({msg:`Page Not Found`})
})

const start=async()=>{
     try {
          await connectDB(process.env.MONGO_URI)

          app.listen(port,()=>{
               console.log(`Server listening to port ${port}...`);
          })
     } catch (error) {
          
     }
}
start()
