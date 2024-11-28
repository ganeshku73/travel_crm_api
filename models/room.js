const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
    hotel_name: {
        type: Schema.Types.ObjectId
    },
    room_name: {
        type: Schema.Types.ObjectId, ref: 'Roomtype'
    },
    gallery: {
        type: [String]
    },
    price: {
        type: String
    },
    room_number: {
        type: String
    },
    number_of_beds: {
        type: String
    },
    room_size: {
        type: String
    },
    max_adults: {
        type: String
    },
    max_children: {
        type: String
    },
    room_amenities: {
        type: [String]
    },
   
    status: {
        type: String
    },
    room_photo:{
        type: String
    }
    


});

module.exports = mongoose.model('Room', roomSchema)