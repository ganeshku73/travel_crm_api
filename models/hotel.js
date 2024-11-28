const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const hotelSchema = new mongoose.Schema({
    hotel_name: {
        type: String
    },
    content: {
        type: String
    },
    highlight: {
        type: String
    },
    
    youtube_video: {
        type: String
    },
    gallery: {
        type: [String]
    },
    hotel_rating_standard: {
        type: String
    },
    hotel_star: {
        type: String
    },
    guarantee_policy: {
        type: String
    },
    children_policy: {
        type: String
    },
    cancellation_policy: {
        type: String
    },
    late_check_out_policy: {
        type: String
    },
    time_for_check_in: {
        type: String
    },
    time_for_check_out: {
        type: String
    },
    min_day_before_booking: {
        type: String
    },
    min_day_stays: {
        type: String
    },
    price: {
        type: String
    },
    offer_price: {
        type: String
    },
    location: {
        type: Schema.Types.ObjectId, ref: 'Location'
    },
    real_address: {
        type: String
    },
    the_geographic_coordinate: {
        type: String
    },
    map_latitude: {
        type: String
    },
    map_longitude: {
        type: String
    },
    map_zoom: {
        type: String
    },
    search_engines_show_service: {
        type: String
    },
    Seo_title: {
        type: String
    },
    Seo_discription: {
        type: String
    },
    publish: {
        type: String
    },
    author_setting: {
        type: String
    },
    hotel_featured: {
        type: String
    },
    property_type: {
        type: [String]
    },
    facilities: {
        type: [String]
    },
    hotel_service: {
        type: [String]
    },
    phone_number: {
        type: String
    },
    email_id: {
        type: String
    },
    website: {
        type: String
    },
    address: {
        type: String
    },
    hotel_photo: {
        type: String
    },
    Total_rooms: {
        type: String
    },
    hotel_packages: {
        type: String
    },
    food: {
        type: String
    },
    room_type: {
        type: String
    },
    budget: {
        type: String
    },
    services: {
        type: String
    },
    rating: {
        type: String
    },
    
});

// Define a virtual property 'rooms' that references rooms based on hotelId
//  hotelSchema.virtual('rooms', {
//      ref: 'Room', // The model to use for populating
//      localField: '_id', // Find rooms where `localField` (hotel._id) equals `foreignField` (room.hotelId)
//      foreignField: 'hotel_name',
//      justOne: false // Populate as an array of rooms
//    });


module.exports = mongoose.model('Hotel', hotelSchema)