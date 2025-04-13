const Room=require('../models/room')

exports.addRoom=async(req,res)=>{
     try {
          const roomData={...req.body};
          console.log(req.files)
          if(!req.files){
               console.log("no")
          }
          roomData.images=req.files["roomImages"]?req.files["roomImages"].map(image=>image.filename):[]
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
          const allRooms=await Room.find({isDeleted:false});
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

exports.deleteRoom=async(req,res)=>{
     try {
          const {roomId}=req.query
          if(!roomId){
               return res.status(400).json({
                    status:"fail",
                    code:400,
                    message:"Room Id is required"
               })
          }
          const deletedRoom=await Room.findById(roomId);
          if(!deletedRoom){
               return res.status(404).json({
                    status:"fail",
                    code:404,
                    message:"Room Not Found"
               })
          }
          deletedRoom.isDeleted=true;
          await deletedRoom.save();

          res.status(200).json({
               status:"success",
               code:200,
               message:"Room Deleted Successfully"
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

exports.updateRoom=async(req,res)=>{
     try {
          const {roomId}=req.query
          if(!roomId){
               return res.status(400).json({
                    status:"fail",
                    code:400,
                    message:"Room Id is required"
               })
          }
          const updatedRoom=await Room.findById(roomId);
          if(!updatedRoom){
               return res.status(404).json({
                    status:"fail",
                    code:404,
                    message:"Room Not Found"
               })
          }
          updatedRoom.title=req.body.title||updatedRoom.title
          updatedRoom.address=req.body.address||updatedRoom.address
          updatedRoom.city=req.body.city||updatedRoom.city
          updatedRoom.state=req.body.state||updatedRoom.state
          updatedRoom.zipcode=req.body.zipcode||updatedRoom.zipcode
          updatedRoom.description=req.body.description||updatedRoom.description
          updatedRoom.price=req.body.price|| updatedRoom.price
          updatedRoom.deposit=req.body.deposit||updatedRoom.deposit
          updatedRoom.bhk=req.body.bhk||updatedRoom.bhk
          updatedRoom.sqft=req.body.sqft||updatedRoom.sqft
          updatedRoom.tenants=req.body.tenants||updatedRoom.tenants
          updatedRoom.gender=req.body.gender||updatedRoom.gender
          updatedRoom.room_type=req.body.room_type||updatedRoom.room_type
          updatedRoom.images=req.files?req.files["roomImages"].map(image=>image.filename):[]

          await updatedRoom.save();
          res.status(200).json({
               status:"success",
               code:200,
               message:"Room Updated Successfully",
               data:updatedRoom
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