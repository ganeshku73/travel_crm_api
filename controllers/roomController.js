const Validator = require('fastest-validator');
const RoomModel = require('../models/room');
const jwt = require('jsonwebtoken');

async function RoomRegister(req,res){
    
    const room_id  = req.body.room_id;
    const hotel_name  = req.body.hotel_name;
    const room_name = req.body.room_name;
    const price = req.body.price;
    const room_number = req.body.room_number;
    const number_of_beds = req.body.number_of_beds;
    const room_size = req.body.room_size;
    const max_adults = req.body.max_adults;
    const max_children = req.body.max_children;
    const room_amenities = req.body.room_amenities;
    const status = req.body.status;
   
   
    var photo = '';
    var gallery = [];

    if(req.files && Object.keys(req.files).length != 0){
        if (req.files['room_photo'].length != 0) {
            photo = req.files['room_photo'][0].path;
        } 
    }
	
    if(req.files && req.files['gallery'] && req.files['gallery'].length > 0){
        for(let i=0;i<(req.files['gallery']).length;i++){
			gallery[i] = req.files['gallery'][i].path;
		}
	}
    
    
   

    const request_Room_Data = {
        hotel_name:hotel_name,
        room_name:room_name,
        price:price,
        room_number:room_number,
        number_of_beds:number_of_beds,
        room_size:room_size,
        max_adults:max_adults,
        max_children:max_children,
        room_amenities:room_amenities.split(','),
        status:status,
       
    }

    const schema = {
        hotel_name:{type:"string",optional:false},
        room_name:{type:"string",optional:false},
        price:{type:"string",optional:false},
        room_number:{type:"string",optional:false},
        number_of_beds:{type:"string",optional:false},
        room_size:{type:"string",optional:false},
        max_adults:{type:"string",optional:false},
        max_children:{type:"string",optional:false},
        room_amenities:{type: 'array',  items: { type: 'string' }, optional:true},
        status:{type:"string",optional:false},
    }

    const v = new Validator();
    const validatorResponse = v.validate(request_Room_Data,schema);
    
    if(validatorResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validatorResponse,
            status:0
        })
    }

    if(photo != ''){
        request_Room_Data.room_photo = photo;
    }
   
    if(gallery.length>0){
        request_Room_Data.gallery = gallery;
    }
    

    console.log(room_id);
    if(room_id && room_id != 'null' && room_id != null){
		console.log('tets');
        RoomModel.findByIdAndUpdate({ _id: room_id }, request_Room_Data, { new: true }).then(updatedRoom => {
        if (!updatedRoom) {
            return res.status(500).json({
                message: "room not updated",
                result: [],
                status:1
                });
            } else {
                return res.status(200).json({
                    message: "room updated",
                    result: updatedRoom,
                    status:1,
                });
                
            }
        })

    }else{
        const data = new RoomModel(request_Room_Data)
        data.save();
        message= "data saved";
        return res.status(200).json({
            message: message,
            result: data,
            status:1
        });
    }
}

async function RoomList(req,res){
    let query = {};

    if (req.query.room_amenities && typeof req.query.room_amenities === 'string') {
      
      
        const room_amenities = req.query.room_amenities.split(','); // Split comma-separated string into array
        // Construct a query to find hotels where at least one facility matches
        query = {
            room_amenities: { $in: room_amenities }
        };

    }
    const result = await RoomModel.find(query); 
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
async function RoomListById(req,res){
    const id = req.params.id;
    const result = await RoomModel.findById(id); 
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

async function RoomDelete(req,res){
    const id = req.params.id;
    const result = await RoomModel.findByIdAndDelete(id); 
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
    RoomRegister,RoomList,RoomListById,RoomDelete
}