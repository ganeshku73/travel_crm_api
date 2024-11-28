const Validator = require('fastest-validator');
const HotelModel = require('../models/hotel');
const LocationModel = require('../models/location');
const RoomModel = require('../models/room');
const RoomType = require('../models/roomtype');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


async function HotelRegister(req,res){
    
    const hotel_id  = req.body.hotel_id;
    const hotel_name  = req.body.hotel_name;
    const content = req.body.content;
    const highlight = req.body.highlight;
    const youtube_video = req.body.youtube_video;
    const hotel_rating_standard = req.body.hotel_rating_standard;
    const hotel_star = req.body.hotel_star;
    const guarantee_policy = req.body.guarantee_policy;
    const children_policy = req.body.children_policy;
    const cancellation_policy = req.body.cancellation_policy;
    const late_check_out_policy = req.body.late_check_out_policy;
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
	//console.log(facilities);
    var photo = '';
    var gallery = [];
	
    if(req.files && req.files['hotel_photo'] && Object.keys(req.files).length != 0){
        photo = req.files['hotel_photo'][0].path;
        
    }
	
	if(req.files && req.files['gallery'] && req.files['gallery'].length > 0){
        for(let i=0;i<(req.files['gallery']).length;i++){
			gallery[i] = req.files['gallery'][i].path;
		}
	}
	
	console.log(gallery);
	
    const request_Hotel_Data = {
        hotel_name:hotel_name,
        content:content,
        highlight:highlight,
        youtube_video:youtube_video,
        hotel_rating_standard:hotel_rating_standard,
        hotel_star:hotel_star,
        guarantee_policy:guarantee_policy,
        children_policy:children_policy,
        cancellation_policy:cancellation_policy,
        late_check_out_policy:late_check_out_policy,
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
        property_type:property_type.split(','),
        facilities:facilities.split(','),
        hotel_service:hotel_service.split(','),
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
        highlight:{type:"string",optional:false},
        youtube_video:{type:"string",optional:false},
        hotel_rating_standard:{type:"string",optional:false},
        hotel_star:{type:"string",optional:false},
        guarantee_policy:{type:"string",optional:false},
        children_policy:{type:"string",optional:false},
        cancellation_policy:{type:"string",optional:false},
        late_check_out_policy:{type:"string",optional:false},
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
        property_type:{ type: 'array', items: { type: 'string' }, optional: true},
		facilities: { type: 'array', items: { type: 'string' }, optional: true },
        hotel_service:{ type: 'array', items: { type: 'string' }, optional: true},
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
	
	if(gallery.length>0){
        request_Hotel_Data.gallery = gallery;
    }

    //console.log(hotel_id);
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

    let query = {};
    if (req.query.starRating) {
		console.log('test'+req.query.starRating);
        //const starRatings = req.query.starRating.split(',');
		const starRatingArray = req.query.starRating.split(',');
		console.log(starRatingArray);
		query = {
		  hotel_star: { $in: starRatingArray }
		};
	}
    //console.log('query'+query);  
    if (req.query.propertyType) {
        const propertyType = req.query.propertyType.split(','); 
        query = {
            property_type: { $in: propertyType }
        };
       
    }

    if (req.query.services) {
        const hotelService = req.query.services.split(','); 
        query = {
            hotel_service: { $in: hotelService }
        };
       
    }

    if (req.query.facilities && typeof req.query.facilities === 'string') {
        const facilities = req.query.facilities.split(','); // Split comma-separated string into array
        // Construct a query to find hotels where at least one facility matches
        query = {
            facilities: { $in: facilities }
        };

    }
	
	let sortingquery = {};
	
	if (req.query.sort_by && req.query.sort_by !='' && typeof req.query.sort_by === 'string') {
        const sort_by = req.query.sort_by;
		if(sort_by === 'hotel_star'){
			sortingquery = { hotel_star: 1 }
		}else if(sort_by === 'price'){
			sortingquery = { price: 1 }
		}
	}
    let skips = 0;
	let pagesize = 15;
	if (req.query.page && req.query.page !='' && typeof req.query.page === 'string' && req.query.limit) {
        skips = req.query.limit * (req.query.page - 1);
		pagesize  = req.query.limit;
	}
    //console.log(query);
	
	let result = '';
	
	const resultCount =  await HotelModel.countDocuments();
	const totalPages = Math.ceil(resultCount/pagesize);
	if (Object.keys(sortingquery).length === 0 && skips===0) {

	   result = await HotelModel.find(query).skip(skips).limit(pagesize);
	}else{
	   result = await HotelModel.find(query).sort(sortingquery).skip(skips).limit(pagesize);
	}
    

	
    if(result != ''){
       return res.status(200).json({
            message: " ",
            result: result,
			resultCount:resultCount,
			totalPages:totalPages,
            status:1
        });
    }else{
        return res.status(403).json({
            message: "Record Not Found",
            result: [],
			resultCount:resultCount,
			totalPages:totalPages,
            status:0
        });
    }
    
}
async function HotelListById(req,res){
    const id = req.params.id;
	let query = {};
	let relatedHotels = '';
	const hotel = await HotelModel.findById(id).populate('location'); 
    
    const rooms = await RoomModel.find({hotel_name:hotel._id}).populate('room_name');
    result = { ...hotel.toObject(), rooms };
    
	if (hotel.hotel_star) {
		const starRating = hotel.hotel_star;
		query = {
		  hotel_star: starRating,
		   _id: { $ne: hotel._id }
		};
		//hotel._id
		relatedHotels = await HotelModel.find(query).limit(5);; 
		 	
	}
	
	
    if(result != ''){
       return res.status(200).json({
            message: " ",
            result: result,
			rooms:rooms,
			relatedHotels:relatedHotels,
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