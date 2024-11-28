const express = require('express');
const authRouter = express.Router();
const auth = require('../controllers/authController');
const mongoConfig = require('../config/mongoDb');
authRouter.post("/login",auth.login)

module.exports = authRouter;