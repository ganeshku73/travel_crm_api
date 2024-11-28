const Validator = require('fastest-validator');
const EnqueryModel = require('../models/enquery');
const jwt = require('jsonwebtoken');


async function AddEnquery(req,res){
	const request_Data = {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        checkIn:req.body.checkIn,
        checkOut:req.body.checkOut,
        adults:req.body.adults,
        message:req.body.message
    }
    console.log(request_Data)
	const schema = {
        name:{type:"string",optional:false},
        email:{type:"string",optional:false},
        phone:{type:"string",optional:false},
        checkIn:{type:"string",optional:false},
        checkOut:{type:"string",optional:false},
        adults:{type:"string",optional:false},
        message:{type:"string",optional:false}

    }

    const v = new Validator();
    const validatorResponse = v.validate(request_Data,schema);
    
    if(validatorResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validatorResponse,
            status:0
        })
    }

    const data = new EnqueryModel(request_Data)
       if(data.save()){
		    message = "data saved";
			return res.status(200).json({
				message: message,
				result: data,
				status:1
			});
	   }else{
		    message= "Something went wrng";
			return res.status(200).json({
				message: message,
				result: [],
				status:1
			});
	   }
   
}

async function EnqueryList(req,res){
    const result = await EnqueryModel.find(); 
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

async function EnqueryDelete(req,res){
    const id = req.params.id;
    const result = await EnqueryModel.findByIdAndDelete(id); 
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
    AddEnquery,EnqueryList,EnqueryDelete
}