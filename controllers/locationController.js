const Validator = require('fastest-validator');
const LocationModel = require('../models/location');
const jwt = require('jsonwebtoken');


async function LocationRegister(req,res){
    const location_id  = req.body.location_id;
    const location_name  = req.body.location_name;
    const description = req.body.description;
   
    const request_Location_Data = {
        location_name:location_name,
        description:description,
    }
	console.log(request_Location_Data);
    const schema = {
        location_name:{type:"string",optional:false},
        description:{type:"string",optional:false},
    }

    const v = new Validator();
    const validatorResponse = v.validate(request_Location_Data,schema);
    
    if(validatorResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validatorResponse,
            status:0
        })
    }

    

    console.log(location_id);
    if(location_id && location_id != 'null' && location_id != null){
		console.log('tets');
        LocationModel.findByIdAndUpdate({ _id: location_id }, request_Location_Data, { new: true }).then(updatedLocation => {
        if (!updatedLocation) {
            return res.status(500).json({
                message: "location not updated",
                result: [],
                status:1
                });
            } else {
                return res.status(200).json({
                    message: "location updated",
                    result: updatedLocation,
                    status:1,
                });
                
            }
        })

    }else{
        const data = new LocationModel(request_Location_Data)
        data.save();
        message= "data saved";
        return res.status(200).json({
            message: message,
            result: data,
            status:1
        });
    }
}

async function LocationList(req,res){
    const result = await LocationModel.find(); 
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
async function LocationListById(req,res){
    const id = req.params.id;
    const result = await LocationModel.findById(id); 
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

async function LocationDelete(req,res){
    const id = req.params.id;
    const result = await LocationModel.findByIdAndDelete(id); 
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
    LocationRegister,LocationList,LocationListById,LocationDelete
}