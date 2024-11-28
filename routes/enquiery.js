const express = require('express');
const EnqueryRouter = express.Router();
const enqueryController = require('../controllers/enqueryController');
const mongoConfig = require('../config/mongoDb');
const LoginAuht = require('../middleware/checkLogin')


EnqueryRouter.post("/add-enquery",enqueryController.AddEnquery)
EnqueryRouter.get("/enquery-list",LoginAuht.checkLogin,enqueryController.EnqueryList)
EnqueryRouter.delete("/enquery-delete/:id",LoginAuht.checkLogin,enqueryController.EnqueryDelete)
module.exports = EnqueryRouter;