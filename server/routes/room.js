const express = require('express')
const { addRoom, getAllRooms, deleteRoom, updateRoom } = require('../controllers/room')
const upload = require('../utils/fileStorage')
const roomRouter = express.Router()

roomRouter.post( '/addroom' , upload.fields([{ name: "roomImages", maxCount:4  }]), addRoom).delete('/deleteroom',upload.fields([{ name: "roomImages", maxCount:4  }]), deleteRoom).patch('/updateroom',upload.fields([{ name: "roomImages", maxCount:4  }]), updateRoom)
roomRouter.route('/').get(getAllRooms)

module.exports = roomRouter