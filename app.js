const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config();

const authRouter = require('./routes/auth')
const CarRouter = require('./routes/car')
const HotelRouter = require('./routes/hotel')
const OperatorRouter = require('./routes/operator')
const LocationRouter = require('./routes/location')
const RoomRouter = require('./routes/room')
const RoomtypeRouter = require('./routes/roomtype')


app.use("/auth",authRouter);
app.use("/car",CarRouter);
app.use("/hotel",HotelRouter);
app.use("/operator",OperatorRouter);
app.use("/location",LocationRouter);
app.use("/room",RoomRouter);
app.use("/roomtype",RoomtypeRouter);



module.exports = app;