const express = require('express');
const RoomtypeRouter = express.Router();
const Roomtype = require('../controllers/roomtypeController');
const mongoConfig = require('../config/mongoDb');
const LoginAuht = require('../middleware/checkLogin')


RoomtypeRouter.post("/roomtype-register",LoginAuht.checkLogin,Roomtype.RoomtypeRegister)

RoomtypeRouter.get("/roomtype-list",LoginAuht.checkLogin,Roomtype.RoomtypeList)
RoomtypeRouter.get("/roomtype-list/:id",LoginAuht.checkLogin,Roomtype.RoomtypeListById)
RoomtypeRouter.delete("/roomtype-delete/:id",LoginAuht.checkLogin,Roomtype.RoomtypeDelete)
module.exports = RoomtypeRouter;