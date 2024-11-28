const express = require('express');
const HotelRouter = express.Router();
const Hotel = require('../controllers/hotelController');
const mongoConfig = require('../config/mongoDb');
const LoginAuht = require('../middleware/checkLogin')
const HotelImageUploade = require('../middleware/HotelImageUpload')

HotelRouter.use('/uploads/hotels', express.static('uploads/hotels'));



HotelRouter.post("/hotel-register",LoginAuht.checkLogin,HotelImageUploade.HotelImageUpload.fields([
    { name: 'hotel_photo', maxCount: 1 },
	{ name: 'gallery', maxCount: 10 }
    ]),Hotel.HotelRegister)

HotelRouter.get("/hotel-list",LoginAuht.checkLogin,Hotel.HotelList)
HotelRouter.get("/hotel-list/:id",LoginAuht.checkLogin,Hotel.HotelListById)
HotelRouter.delete("/hotel-delete/:id",LoginAuht.checkLogin,Hotel.HotelDelete)
module.exports = HotelRouter;