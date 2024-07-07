const Validator = require('fastest-validator');
const RoomtypeModel = require('../models/roomtype');
const jwt = require('jsonwebtoken');


async function RoomtypeRegister(req,res){
    const room_id  = req.body.room_id;
    const room_name  = req.body.room_name;
    
    const request_Roomtype_Data = {
        room_name:room_name,
        
    }
    console.log(request_Roomtype_Data)
	
    const schema = {
        room_name:{type:"string",optional:false},

    }

    const v = new Validator();
    const validatorResponse = v.validate(request_Roomtype_Data,schema);
    
    if(validatorResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validatorResponse,
            status:0
        })
    }

    

    if(room_id && room_id != 'null' && room_id != null){
	
        RoomtypeModel.findByIdAndUpdate({ _id: room_id }, request_Roomtype_Data, { new: true }).then(updatedRoomtype => {
        if (!updatedRoomtype) {
            return res.status(500).json({
                message: "roomtype not updated",
                result: [],
                status:1
                });
            } else {
                return res.status(200).json({
                    message: "roomtype updated",
                    result: updatedRoomtype,
                    status:1,
                });
                
            }
        })

    }else{
        const data = new RoomtypeModel(request_Roomtype_Data)
        data.save();
        message= "data saved";
        return res.status(200).json({
            message: message,
            result: data,
            status:1
        });
    }
}

async function RoomtypeList(req,res){
    const result = await RoomtypeModel.find(); 
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
async function RoomtypeListById(req,res){
    const id = req.params.id;
    const result = await RoomtypeModel.findById(id); 
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

async function RoomtypeDelete(req,res){
    const id = req.params.id;
    const result = await RoomtypeModel.findByIdAndDelete(id); 
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
        RoomtypeRegister,RoomtypeList,RoomtypeListById,RoomtypeDelete
}