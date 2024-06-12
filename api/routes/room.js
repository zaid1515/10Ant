const express = require('express')
const { addRoom, getAllRooms } = require('../controllers/room')
const upload = require('../utils/fileStorage')
const roomRouter = express.Router()

roomRouter.post( '/addroom' , upload.fields([{ name: "roomImages", maxCount:4  }]), addRoom)
roomRouter.route('/').get(getAllRooms)

module.exports = roomRouter