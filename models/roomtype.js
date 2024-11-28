const mongoose = require('mongoose');

const roomtypeSchema = new mongoose.Schema({
    room_name: {
        type: String
    },
});

module.exports = mongoose.model('Roomtype', roomtypeSchema)