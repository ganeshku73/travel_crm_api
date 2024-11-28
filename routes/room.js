const express = require('express');
const RoomRouter = express.Router();
const Room = require('../controllers/roomController');
const mongoConfig = require('../config/mongoDb');
const LoginAuht = require('../middleware/checkLogin')
const RoomImageUploade = require('../middleware/RoomImageUpload')

RoomRouter.use('/uploads/rooms', express.static('uploads/rooms'));



RoomRouter.post("/room-register",LoginAuht.checkLogin,RoomImageUploade.RoomImageUpload.fields([
    { name: 'room_photo', maxCount: 1 },
    { name: 'gallery' }
    ]),Room.RoomRegister)
   

RoomRouter.get("/room-list",LoginAuht.checkLogin,Room.RoomList)
RoomRouter.get("/room-list/:id",LoginAuht.checkLogin,Room.RoomListById)
RoomRouter.delete("/room-delete/:id",LoginAuht.checkLogin,Room.RoomDelete)
module.exports = RoomRouter;