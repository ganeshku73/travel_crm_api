const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const packageSchema = new mongoose.Schema({
    title: {
        type: String
    },
	rating:{
		type: String
	},
    package_type: {
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
    banner: {
        type: String
    },
    feature_image: {
        type: String
    },
    gallery: {
        type: [String]
    },
    min_day_for_booking: {
        type: String
    },
    duration: {
        type: String
    },
    tour_min_people: {
        type: String
    },
    
    tour_max_people: {
        type: String
    },
    faq: {
        type: String
    },
    cancellation_policy: {
        type: String
    },
    include: {
        type: String
    },
    exclude: {
        type: String
    },
    intenery: {
        type: String
    },
    
    price: {
        type: Number
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
    map_zoom: {
        type: String
    },
    search_engines_show_service: {
        type: String
    },
    seo_title: {
        type: String
    },
    seo_discription: {
        type: String
    },
    publish: {
        type: String
    },
    author: {
        type: String
    },
    
    phone_number: {
        type: String
    },
    email_id: {
        type: String
    },
	package_available: {
        type: String
    }
    
    
});



module.exports = mongoose.model('Package', packageSchema)