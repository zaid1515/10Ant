const Room=require('../models/room')

exports.addRoom=async(req,res)=>{
     try {
          const roomData={...req.body};
          roomData.images=req.files?req.files["roomImages"].map(image=>image.filename):[]
          console.log(roomData)
          const newRoom=await Room.create({
               owner_pkey: roomData.owner_pkey,
               title: roomData.title,
               address: roomData.address,
               city: roomData.city,
               state: roomData.state,
               zipcode: roomData.zipcode,
               description: roomData.description,
               price: roomData.price,
               deposit: roomData.deposit,
               bhk: roomData.bhk,
               sqft: roomData.sqft,
               tenants: roomData.tenants,
               gender: roomData.gender,
               room_type: roomData.room_type,
               images: roomData.images
          })
          if(!newRoom){
               res.status(400).json({
                    status:"fail",
                    code:400,
                    message:"Failed to create new room"
               })
          }
          res.status(200).json({
               code:200,
               status:"success",
               data:newRoom,
               message:"New Room Created by the Owner"
          })
     } catch (error) {
          console.log(error.message);
          res.status(500).json({
               status:"fail",
               code:500,
               error:error.message
          })
     }
}

exports.getAllRooms=async(req,res)=>{
     try {
          // get all rooms except the rooms of current user, if any (not implemented this yet)
          const allRooms=await Room.find({})
          if(!allRooms){
               return res.status(404).json({
                    status:"fail",
                    code:404,
                    message:"Rooms not Found"
               })
          }
          res.status(200).json({
               status:"success",
               code:200,
               nessage:"Fetched All Rooms",
               data:allRooms
          })

     } catch (error) {
          console.log(error.message);
          res.status(500).json({
               status:"fail",
               code:500,
               error:error.message
          })
     }
}