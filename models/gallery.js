const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gallerySchema = new mongoose.Schema({
    gallery: {
        type: String
    }
});
module.exports = mongoose.model('Gallery', gallerySchema)