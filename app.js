const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3001'  // Your React app's URL (in development)
//   }));
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
const PackageRouter = require('./routes/package_route')
const EnquieryRouter = require('./routes/enquiery')

app.use("/auth",authRouter);
app.use("/car",CarRouter);
app.use("/hotel",HotelRouter);
app.use("/package",PackageRouter);
app.use("/operator",OperatorRouter);
app.use("/location",LocationRouter);
app.use("/room",RoomRouter);
app.use("/roomtype",RoomtypeRouter);
app.use("/enquery",EnquieryRouter);

module.exports = app;
