const express = require('express');
const OperatorRouter = express.Router();
const Operator = require('../controllers/operatorController');
const mongoConfig = require('../config/mongoDb');
const LoginAuht = require('../middleware/checkLogin')
const OperatorImageUpload = require('../middleware/OperatorImageUpload')

OperatorRouter.use('/uploads/operators', express.static('uploads/operators'));



OperatorRouter.post("/operator-register",LoginAuht.checkLogin,OperatorImageUpload.OperatorImageUpload.fields([
    { name: 'operator_photo', maxCount: 1 }
    ]),Operator.OperatorRegister)
OperatorRouter.get("/operator-list",LoginAuht.checkLogin,Operator.OperatorList)
OperatorRouter.get("/operator-list/:id",LoginAuht.checkLogin,Operator.OperatorListById)
OperatorRouter.delete("/operator-delete/:id",LoginAuht.checkLogin,Operator.OperatorDelete)
module.exports = OperatorRouter;