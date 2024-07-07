const express = require('express');
const LocationRouter = express.Router();
const Location = require('../controllers/locationController');
const mongoConfig = require('../config/mongoDb');
const LoginAuht = require('../middleware/checkLogin')
LocationRouter.post("/location-register",LoginAuht.checkLogin,Location.LocationRegister)

LocationRouter.get("/location-list",LoginAuht.checkLogin,Location.LocationList)
LocationRouter.get("/location-list/:id",LoginAuht.checkLogin,Location.LocationListById)
LocationRouter.delete("/location-delete/:id",LoginAuht.checkLogin,Location.LocationDelete)
module.exports = LocationRouter;