const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotel_name: {
        type: String
    },
    content: {
        type: String
    },
    banner_image: {
        type: String
    },
    youtube_video: {
        type: String
    },
    gallery: {
        type: String
    },
    hotel_rating_standard: {
        type: String
    },
    policy: {
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
        type: String
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
        type: String
    },
    facilities: {
        type: String
    },
    hotel_service: {
        type: String
    },
    featured_image: {
        type: String
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

module.exports = mongoose.model('Hotel', hotelSchema)