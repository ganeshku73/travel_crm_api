const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    car_name: {
        type: String
    },
    car_number: {
        type: String
    },
    car_model: {
        type: String
    },
    registration_date: {
        type: Date
    },
    car_color: {
        type: String
    },
    photo: {
        type: String
    },
    is_ac: {
        type: String
    },
    is_bluetooth: {
        type: String
    },
    number_of_seats: {
        type: String
    }
    
});

module.exports = mongoose.model('Car', carSchema)