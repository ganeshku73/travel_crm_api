const Validator = require('fastest-validator');
const HotelModel = require('../models/hotel');
const jwt = require('jsonwebtoken');


async function HotelRegister(req,res){
    
    const hotel_id  = req.body.hotel_id;
    const hotel_name  = req.body.hotel_name;
    const content = req.body.content;
    const banner_image = req.body.banner_image;
    const youtube_video = req.body.youtube_video;
    const gallery = req.body.gallery;
    const hotel_rating_standard = req.body.hotel_rating_standard;
    const policy = req.body.policy;
    const time_for_check_in = req.body.time_for_check_in;
    const time_for_check_out = req.body.time_for_check_out;
    const min_day_before_booking = req.body.min_day_before_booking;
    const min_day_stays = req.body.min_day_stays;
    const price = req.body.price;
    const offer_price = req.body.offer_price;
    const location = req.body.location;
    const real_address = req.body.real_address;
    const the_geographic_coordinate = req.body.the_geographic_coordinate;
    const map_latitude = req.body.map_latitude;
    const map_longitude = req.body.map_longitude;
    const map_zoom = req.body.map_zoom;
    const search_engines_show_service = req.body.search_engines_show_service;
    const Seo_title = req.body.Seo_title;
    const Seo_discription = req.body.Seo_discription;
    const publish = req.body.publish;
    const author_setting = req.body.author_setting;
    const hotel_featured = req.body.hotel_featured;
    const property_type = req.body.property_type;
    const facilities = req.body.facilities;
    const hotel_service = req.body.hotel_service;
    const featured_image = req.body.featured_image;
    const phone_number = req.body.phone_number;
    const email_id= req.body.email_id;
    const website = req.body.website;
    const address = req.body.address;
    const Total_rooms= req.body.Total_rooms;
    const hotel_packages = req.body.hotel_packages;
    const food = req.body.food;
    const room_type = req.body.room_type;
    const budget = req.body.budget;
    const services = req.body.services;
    const rating = req.body.rating;

    var photo = '';
    
    if(req.files && Object.keys(req.files).length != 0){
        if (req.files['hotel_photo'].length != 0) {
            photo = req.files['hotel_photo'][0].path;
        } 
    }

    const request_Hotel_Data = {
        hotel_name:hotel_name,
        content:content,
        banner_image:banner_image,
        youtube_video:youtube_video,
        gallery:gallery,
        hotel_rating_standard:hotel_rating_standard,
        policy:policy,
        time_for_check_in:time_for_check_in,
        time_for_check_out:time_for_check_out,
        min_day_before_booking:min_day_before_booking,
        min_day_stays:min_day_stays,
        price:price,
        offer_price:offer_price,
        location:location,
        real_address:real_address,
        the_geographic_coordinate:the_geographic_coordinate,
        map_latitude:map_latitude,
        map_longitude:map_longitude,
        map_zoom:map_zoom,
        search_engines_show_service:search_engines_show_service,
        Seo_title:Seo_title,
        Seo_discription:Seo_discription,
        publish:publish,
        author_setting:author_setting,
        hotel_featured:hotel_featured,
        property_type:property_type,
        facilities:facilities,
        hotel_service:hotel_service,
        featured_image:featured_image,
        phone_number:phone_number,
        email_id:email_id,
        website:website,
        address:address,
        Total_rooms:Total_rooms,
        hotel_packages:hotel_packages,
        food:food,
        room_type:room_type,
        budget:budget,
        services:services,
        rating:rating
    }

    const schema = {
        hotel_name:{type:"string",optional:false},
        content:{type:"string",optional:false},
        banner_image:{type:"string",optional:false},
        youtube_video:{type:"string",optional:false},
        gallery:{type:"string",optional:false},
        hotel_rating_standard:{type:"string",optional:false},
        policy:{type:"string",optional:false},
        time_for_check_in:{type:"string",optional:false},
        time_for_check_out:{type:"string",optional:false},
        min_day_before_booking:{type:"string",optional:false},
        min_day_stays:{type:"string",optional:false},
        price:{type:"string",optional:false},
        offer_price:{type:"string",optional:false},
        location:{type:"string",optional:false},
        real_address:{type:"string",optional:false},
        the_geographic_coordinate:{type:"string",optional:false},
        map_latitude:{type:"string",optional:true},
        map_longitude:{type:"string",optional:true},
        map_zoom:{type:"string",optional:true},
        search_engines_show_service:{type:"string",optional:false},
        Seo_title:{type:"string",optional:false},
        Seo_discription:{type:"string",optional:false},
        publish:{type:"string",optional:false},
        hotel_featured:{type:"string",optional:false},
        property_type:{type:"string",optional:false},
        facilities:{type:"string",optional:false},
        hotel_service:{type:"string",optional:false},
        featured_image:{type:"string",optional:false},
        phone_number:{type:"string",optional:false},
        email_id:{type:"string",optional:false},
        website:{type:"string",optional:false, convert:true},
        address:{type:"string",optional:true},
        Total_rooms:{type:"string",optional:true},
        hotel_packages:{type:"string",optional:true},
        food:{type:"string",optional:false},
        room_type:{type:"string",optional:false},
        budget:{type:"string",optional:false},
        services:{type:"string",optional:false},
        rating:{type:"string",optional:false}
    }

    const v = new Validator();
    const validatorResponse = v.validate(request_Hotel_Data,schema);
    
    if(validatorResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validatorResponse,
            status:0
        })
    }

    if(photo != ''){
        request_Hotel_Data.hotel_photo = photo;
    }

    console.log(hotel_id);
    if(hotel_id && hotel_id != 'null' && hotel_id != null){
		console.log('tets');
        HotelModel.findByIdAndUpdate({ _id: hotel_id }, request_Hotel_Data, { new: true }).then(updatedHotel => {
        if (!updatedHotel) {
            return res.status(500).json({
                message: "hotel not updated",
                result: [],
                status:1
                });
            } else {
                return res.status(200).json({
                    message: "hotel updated",
                    result: updatedHotel,
                    status:1,
                });
                
            }
        })

    }else{
        const data = new HotelModel(request_Hotel_Data)
        data.save();
        message= "data saved";
        return res.status(200).json({
            message: message,
            result: data,
            status:1
        });
    }
}

async function HotelList(req,res){
    const result = await HotelModel.find(); 
    if(result != ''){
       

        return res.status(200).json({
            message: " ",
            result: result,
            status:1
        });
    }else{
        return res.status(403).json({
            message: "Record Not Found",
            result: [],
            status:0
        });
    }
    
}
async function HotelListById(req,res){
    const id = req.params.id;
    const result = await HotelModel.findById(id); 
    if(result != ''){
       return res.status(200).json({
            message: " ",
            result: result,
            status:1
        });
    }else{
        return res.status(403).json({
            message: "Record Not Found",
            result: [],
            status:0
        });
    }
    
}

async function HotelDelete(req,res){
    const id = req.params.id;
    const result = await HotelModel.findByIdAndDelete(id); 
    if (!result) {
       return res.status(403).json({
            message: "Data not found",
            status:0
        });
    }else{
        return res.status(200).json({
            message: "Record Deleted Successfull",
            result: result,
            status:1
        });
    }
    
}

module.exports = {
    HotelRegister,HotelList,HotelListById,HotelDelete
}