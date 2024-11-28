const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    location_name: {
        type: String
    },
    description: {
        type: String
    },

    });

module.exports = mongoose.model('Location', locationSchema)