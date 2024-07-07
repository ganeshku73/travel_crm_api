const express = require('express');
const CarRouter = express.Router();
const Car = require('../controllers/carController');
const mongoConfig = require('../config/mongoDb');
const LoginAuht = require('../middleware/checkLogin')
const ImageUploade = require('../middleware/ImageUploade')

CarRouter.use('/uploads', express.static('uploads'));

CarRouter.post("/car-register",LoginAuht.checkLogin,ImageUploade.upload.fields([
    { name: 'photo', maxCount: 1 }
    ]),Car.CarRegister)

CarRouter.get("/car-list",LoginAuht.checkLogin,Car.CarList)
CarRouter.get("/car-list/:id",LoginAuht.checkLogin,Car.CarListById)
CarRouter.delete("/car-delete/:id",LoginAuht.checkLogin,Car.CarDelete)
module.exports = CarRouter;