const Validator = require('fastest-validator');
const packageModel = require('../models/package');
const galleryModel = require('../models/gallery');


async function packageGalleryImageAdd(req,res){
    let gallery = '';
    if(req.files && req.files['gallery'] && Object.keys(req.files).length != 0){
        gallery = req.files['gallery'][0].path;
    }
    if(gallery != ''){
        const request_gallery_data = {gallery:gallery};
        const data = new galleryModel(request_gallery_data)
        data.save();
        message= "data saved";
        return res.status(200).json({
            message: message,
            result: data,
            status:1
        });
    }
    
}

async function galleryList(req,res){

    let skips = 0;
    let pagesize = 15;
    if (req.query.page && req.query.page !='' && typeof req.query.page === 'string' && req.query.limit) {
        skips = req.query.limit * (req.query.page - 1);
        pagesize  = req.query.limit;
    }
    const resultCount =  await galleryModel.countDocuments();
    const totalPages = Math.ceil(resultCount/pagesize);
    result = await galleryModel.find().skip(skips).limit(pagesize);
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

async function packageRegister(req,res){
    
    var banner = '';
    var feature_image = '';
    var gallery = [];
	const package_id  = req.body.package_id;
    if(req.files && req.files['banner'] && Object.keys(req.files).length != 0){
        banner = req.files['banner'][0].path;
    }
    if(req.files && req.files['feature_image'] && Object.keys(req.files).length != 0){
        feature_image = req.files['feature_image'][0].path;
    }
	
	if(req.files && req.files['gallery'] && req.files['gallery'].length > 0){
        for(let i=0;i<(req.files['gallery']).length;i++){
			gallery[i] = req.files['gallery'][i].path;
		}
	}
    //console.log(req.body.package_type);
	
	//const itenries = Object.keys(req.body.intenery).map(key => req.body.intenery[key]);
    const request_package_data = {
        title:req.body.title,
        rating:req.body.rating,
        highlight:req.body.highlight,
        package_type:req.body.package_type,
        package_available:req.body.package_available,
        content:req.body.content,
        youtube_video:req.body.youtube_video,
        min_day_for_booking:req.body.min_day_for_booking,
        duration:req.body.duration,
        tour_min_people:req.body.tour_min_people,
        tour_max_people:req.body.tour_max_people,
        faq:req.body.faq,
        cancellation_policy:req.body.cancellation_policy,
        include:req.body.include,
        exclude:req.body.exclude,
        intenery:req.body.intenery,
        price:parseFloat(req.body.price),
        offer_price:parseFloat(req.body.offer_price),
        location:req.body.location,
        real_address:req.body.real_address,
        map_zoom:req.body.map_zoom,
        search_engines_show_service:req.body.search_engines_show_service,
        seo_title:req.body.seo_title,
        seo_discription:req.body.seo_discription,
        publish:req.body.publish,
        author:req.body.author,
        phone_number:req.body.phone_number,
        email_id:req.body.email_id
    }
    //gallery:gallery,
    //banner:banner,
    //feature_images:feature_image,
    const schema = {
        title:{type:"string",optional:false},
        rating:{type:"string",optional:false},
        package_type:{type:"string",optional:false},
        highlight:{type:"string",optional:true},
        hotel_available:{type:"string",optional:true},
        content:{type:"string",optional:true},
        youtube_video:{type:"string",optional:true},
        min_day_for_booking:{type:"string",optional:true},
        duration:{type:"string",optional:true},
        tour_min_people:{type:"string",optional:true},
        tour_max_people:{type:"string",optional:true},
        faq:{ type: 'string', optional: true},
        cancellation_policy:{type:"string",optional:true},
        include:{ type: "string", optional: true},
        exclude:{ type: "string", optional: true},
        intenery:{ type: "string", optional: true},
        price:{type:"number",optional:true},
        offer_price:{type:"number",optional:true},
        location:{type:"string",optional:true},
        real_address:{type:"string",optional:true},
        map_zoom:{type:"string",optional:true},
        search_engines_show_service:{type:"string",optional:true},
        seo_title:{type:"string",optional:true},
        seo_discription:{type:"string",optional:true},
        publish:{type:"string",optional:true},
        author:{type:"string",optional:true},
        phone_number:{type:"string",optional:true},
        email_id:{type:"string",optional:true}
    }

    const v = new Validator();
    const validatorResponse = v.validate(request_package_data,schema);
    
    if(validatorResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validatorResponse,
            status:0
        })
    }    

    if(banner != ''){
        request_package_data.banner = banner;
    }
    if(feature_image != ''){
        request_package_data.feature_image = feature_image;
    }
	if(gallery.length>0){
        request_package_data.gallery = gallery;
    }
	
    if(package_id != 'undefined' && package_id != 'null' && package_id != null){
		packageModel.findByIdAndUpdate({_id: package_id }, request_package_data, { new: true }).then(updatedPackage => {
        if (!updatedPackage) {
            return res.status(500).json({
                message: "Package not updated",
                result: [],
                status:1
                });
            } else {
                return res.status(200).json({
                    message: "Package updated",
                    result: updatedPackage,
                    status:1,
                });
                
            }
        })

    }else{
        const data = new packageModel(request_package_data)
        data.save();
        message= "data saved";
        return res.status(200).json({
            message: message,
            result: data,
            status:1
        });
    }
}
    async function packageList(req,res){

        let query = {};
        if (req.query.starRating) {
            console.log('test'+req.query.starRating);
            //const starRatings = req.query.starRating.split(',');
            const starRatingArray = req.query.starRating.split(',');
            console.log(starRatingArray);
            query = {
              rating: { $in: starRatingArray }
            };
        }
        //console.log('query'+query);  
        
        
		
		if (req.query.minPrice) {
			query.price = {};
			const prices = req.query.minPrice.split(',').map(Number); // Convert to numbers
			// Initialize price filter if it doesn't exist
			if(prices[0]){
				if (prices[0] > 0) {
					let minPriceValue = parseFloat(prices[0]);
					if(!isNaN(minPriceValue) && minPriceValue > 0){
						query.price.$gte = minPriceValue;
					}
				}
			}
			
			if(prices[1]){
				if (prices[1] < Infinity) {
					let maxPriceValue = parseFloat(prices[1]);
					 if (!isNaN(maxPriceValue) && maxPriceValue < Infinity) {
						query.price.$lte = maxPriceValue;
					 }
					
				}
			}
			if (Object.keys(query.price).length === 0) {
					delete query.price;
				  }
			
		}
    
        
        
        let sortingquery = {};
        
        if (req.query.sort_by && req.query.sort_by !='' && typeof req.query.sort_by === 'string') {
            const sort_by = req.query.sort_by;
            if(sort_by === 'package_star'){
                sortingquery = { rating: 1 }
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
        
        const resultCount =  await packageModel.countDocuments();
        const totalPages = Math.ceil(resultCount/pagesize);
        if (Object.keys(sortingquery).length === 0 && skips===0) {
    
           result = await packageModel.find(query).skip(skips).limit(pagesize);
        }else{
           result = await packageModel.find(query).sort(sortingquery).skip(skips).limit(pagesize);
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
    async function packageListById(req,res){
        const id = req.params.id;
        let query = {};
        let relatedPackages = '';
        let packageData = await packageModel.findById(id).populate('location'); 
        
        // const rooms = await RoomModel.find({hotel_name:hotel._id}).populate('room_name');
        // result = { ...hotel.toObject(), rooms };
        const result = packageData;
        if (packageData.tour_max_people) {
            query = {
                tour_max_people:packageData.tour_max_people,
               _id: { $ne: packageData._id }
            };
            //hotel._id
            relatedPackages = await packageModel.find(query).limit(5);; 
        }
        
        
        if(result != ''){
           return res.status(200).json({
                message: " ",
                result: result,
                relatedPackages:relatedPackages,
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
    
    async function packageDelete(req,res){
        const id = req.params.id;
        const result = await packageModel.findByIdAndDelete(id); 
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
    galleryList,packageRegister,packageList,packageListById,packageDelete,packageGalleryImageAdd
}