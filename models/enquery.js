const mongoose = require('mongoose');

const enquerySchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    checkIn: {
        type: String
    },
    checkOut: {
        type: String
    },
	adults: {
        type: String
    },
    message: {
        type: String
    }
    
});

module.exports = mongoose.model('Enquery', enquerySchema)