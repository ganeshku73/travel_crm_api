const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    hotel_name: {
        type: String
    },
    room_name: {
        type: String
    },
    gallery: {
        type: Array
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
        type: String
    },
    status: {
        type: String
    },
    room_photo:{
        type: String
    }
    


});

module.exports = mongoose.model('Room', roomSchema)