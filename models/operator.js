const mongoose = require('mongoose');

const operatorSchema = new mongoose.Schema({
    operator_name: {
        type: String
    },
    operator_phone_number: {
        type: String
    },
    operator_email_id: {
        type: String
    },
    operator_country_name: {
        type: String
    },
    operator_state_name: {
        type: String
    },
    operator_city_name: {
        type: String
    },
    landmark: {
        type: String
    },
    zipcode: {
        type: String
    },
    operator_photo: {
        type: String
    },
    number_of_cars: {
        type: String
    },
    operator_rating: {
        type: String
    },
    
});

module.exports = mongoose.model('Operator', operatorSchema)